import Stripe from "stripe";
import dotenv from "dotenv";
import { Formation } from "../models/formationModel.js";
import path from "path";
import { fileURLToPath } from "url";
import { sendMail } from "../utils/mailer.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Création session Stripe

export const createCheckoutSession = async (req, res) => {
  try {
    const { formationId, userId } = req.body;

    if (!formationId || !userId) {
      return res.status(400).json({ message: "formationId et userId requis." });
    }

    const formation = await Formation.findById(formationId);
    if (!formation) return res.status(404).json({ message: "Formation introuvable." });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: formation.title,
              description: formation.description,
            },
            unit_amount: Math.round(formation.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: { userId, formationId }
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("Erreur Stripe :", error);
    res.status(500).json({ message: "Erreur Stripe", error: error.message });
  }
};


// Mappage formations → PDFs

const PDF_MAP = {
  1: "pdfBodySculptDuo.pdf",
  2: "pdfDermaSkinGlow.pdf",
  3: "pdfVacuoLift.pdf",
};

// Envoi email après paiement

export const paymentSuccess = async (req, res) => {
  try {
    const { email, formationId } = req.body;

    if (!email || !formationId)
      return res.status(400).json({ error: "Email ou formationId manquant" });

    const pdfName = PDF_MAP[formationId];
    if (!pdfName) return res.status(400).json({ error: "PDF introuvable" });

    // Chemin correct du PDF généré
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "..", "utils", "pdfs", "generated", pdfName);

    console.log("📄 PDF utilisé :", filePath);

    // Envoi
    await sendMail({
      to: email,
      subject: "Votre formation - Atelier Signature",
      html: `
        <h2>Merci pour votre achat </h2>
        <p>Voici votre formation téléchargeable en PDF.</p>
      `,
      attachmentsPaths: [filePath],
    });

    return res.json({ success: true });

  } catch (err) {
    console.error("Erreur paiement :", err);
    res.status(500).json({ error: "Erreur envoi email" });
  }
};
