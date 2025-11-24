import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { sendMail } from "../utils/mailer.js";
import dotenv from "dotenv";

dotenv.config();


export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, role } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    const existing = await User.findByEmail(email);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "client",
    });

    // TOKEN VERIFICATION
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const confirmationLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;

    // 📧 ENVOI EMAIL VIA BREVO API
    try {
      await sendMail({
        to: email,
        subject: "Confirmez votre inscription - L’Atelier Signature",
        html: `
          <h2>Bienvenue ${firstName} 💫</h2>
          <p>Merci de vous être inscrite sur <b>L’Atelier Signature</b>.</p>
          <p>Veuillez cliquer sur le bouton ci-dessous pour confirmer votre adresse email :</p>
          <p style="margin-top:20px">
            <a href="${confirmationLink}" 
               style="padding:12px 18px; background:#c27ba0; color:#fff; 
                      text-decoration:none; border-radius:6px">
              Confirmer mon adresse email
            </a>
          </p>
        `,
      });
    } catch (mailError) {
      console.error("Erreur d’envoi du mail :", mailError);
    }

    res.status(201).json({
      message: "Utilisateur créé. Vérifiez vos emails pour activer votre compte.",
      userId,
    });
  } catch (error) {
    console.error("Erreur serveur (register):", error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findByEmail(email);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const user = existing[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Connexion réussie.",
      token,
      user: { id: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role },
    });
  } catch (error) {
    console.error("Erreur serveur (login):", error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};
