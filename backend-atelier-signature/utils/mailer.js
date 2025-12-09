import axios from "axios";
import fs from "fs";
import path from "path";

export const sendMail = async ({ to, subject, html, attachmentsPaths = [] }) => {
  try {
    let attachments = [];

  
    if (attachmentsPaths.length > 0) {
      attachments = attachmentsPaths.map((filePath) => ({
        name: path.basename(filePath),
        content: fs.readFileSync(filePath).toString("base64"),
      }));
    }

  
    const emailPayload = {
      sender: {
        name: process.env.EMAIL_FROM_NAME,
        email: process.env.EMAIL_FROM,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };
    if (attachments.length > 0) {
      emailPayload.attachment = attachments;
    }

    await axios.post("https://api.brevo.com/v3/smtp/email", emailPayload, {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    });

    console.log("Email envoyé via Brevo à :", to);
  } catch (error) {
    console.error("Erreur envoi email via Brevo :", error.response?.data || error.message);
    throw error;
  }
};


