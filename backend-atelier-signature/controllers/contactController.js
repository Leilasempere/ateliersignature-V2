import { sendMail } from "../utils/mailer.js";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
      console.log("Nouvelle demande de contact :", req.body);

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Champs requis manquants." });
    }

    const html = `
      <h2>Nouveau message depuis le site</h2>

      <p><b>Nom :</b> ${name}</p>
      <p><b>Email :</b> ${email}</p>
      <p><b>Téléphone :</b> ${phone || "Non renseigné"}</p>
      <p><b>Objet :</b> ${subject}</p>

      <h3>Message :</h3>
      <p>${message}</p>
    `;

    await sendMail({
      to: process.env.CONTACT_EMAIL,
      subject: `Message du site - ${subject}`,
      html,
    });

    res.json({ success: true, message: "Message envoyé avec succès." });
  } catch (err) {
    console.error("Erreur envoi contact :", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};
