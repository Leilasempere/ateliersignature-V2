import axios from "axios";
import fs from "fs";
import path from "path";

export const sendMail = async ({ to, subject, html, attachmentsPaths = [] }) => {
  try {
    // Convertir les fichiers en base64 pour Brevo
    const attachments = attachmentsPaths.map((filePath) => {
      const content = fs.readFileSync(filePath).toString("base64");
      return { 
        name: path.basename(filePath), 
        content 
      };
    });

    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.EMAIL_FROM_NAME,
          email: process.env.EMAIL_FROM
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
        attachment: attachments
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email envoyé via Brevo API à :", to);
  } catch (error) {
    console.error("Erreur envoi email via Brevo :", error.response?.data || error.message);
    throw error;
  }
};
