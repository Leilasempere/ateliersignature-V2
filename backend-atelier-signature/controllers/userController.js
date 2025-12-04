import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { sendMail } from "../utils/mailer.js";
import dotenv from "dotenv";

dotenv.config();


export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, role } = req.body;

  console.log(" [REGISTER] Reçu une inscription pour :", email);

  try {
    if (password !== confirmPassword) {
      console.log(" [REGISTER] MDP différents");
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    const existing = await User.findByEmail(email);
    if (existing.length > 0) {
      console.log(" [REGISTER] Email déjà utilisé :", email);
      return res.status(409).json({ message: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "client",
      isVerified: 0,
    });

    console.log(" [REGISTER] Utilisateur créé en BDD, id =", userId);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const verificationLink = `${process.env.BACKEND_URL}/api/users/verify?token=${token}`;

    console.log(" [REGISTER] Envoi mail de vérification à", email);
    console.log(" [REGISTER] Lien de vérification:", verificationLink);

    try {
      await sendMail({
        to: email,
        subject: "Confirmez votre inscription - L’Atelier Signature",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;
                      border:1px solid #eee;border-radius:10px;background:#fafafa;">
            <h2 style="color:#111;">Bienvenue ${firstName} </h2>
            <p>Merci de vous être inscrite sur <b>L’Atelier Signature</b>.</p>
            <p>Pour activer votre compte, cliquez sur le bouton ci-dessous :</p>
            <p style="text-align:center;margin:30px 0;">
              <a href="${verificationLink}"
                 style="background-color:#111;color:#fff;padding:12px 20px;
                        text-decoration:none;border-radius:8px;font-weight:bold;">
                  Confirmer mon adresse email
              </a>
            </p>
            <p style="color:#666;">Ce lien est valable 24 heures.</p>
          </div>
        `,
      });

      console.log("[REGISTER] Email de vérification envoyé à", email);
    } catch (mailError) {
      console.error(" [REGISTER] Erreur d’envoi du mail de vérification :", mailError.response?.data || mailError.message);
    }

    res.status(201).json({
      message: "Utilisateur créé. Vérifiez vos emails pour activer votre compte.",
      userId,
    });
  } catch (error) {
    console.error("[REGISTER] Erreur serveur :", error);
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

    // VÉRIFICATION EMAIL
    if (user.isVerified === 0) {
      return res.status(403).json({ message: "Veuillez vérifier votre email avant de vous connecter." });
    }

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
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Erreur serveur (login):", error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).json({ message: "Token manquant." });

  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const email = decoded.email;

    // Active le compte
    await User.verifyEmail(email);

    return res.json({ message: "Compte vérifié avec succès !" });

  } catch (err) {
    return res.status(400).json({ message: "Lien invalide ou expiré." });
  }
};
