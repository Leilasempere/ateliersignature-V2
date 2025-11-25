import Stripe from "stripe";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { sendMail } from "../utils/mailer.js";
import { Formation } from "../models/formationModel.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// -------------------------
// PDF mapping
// -------------------------
const PDF_MAP = {
  1: "pdfBodySculptDuo.pdf",
  2: "pdfDermaSkinGlow.pdf",
  3: "pdfVacuoLift.pdf",
};

// -------------------------
// 1️⃣ Créer une session Stripe
// -------------------------
export const createCheckoutSession = async (req, res) => {
  try {
    const { formationId, userId } = req.body;

    if (!formationId || !userId) {
      return res.status(400).json({ message: "formationId & userId requis" });
    }

    const formation = await Formation.findById(formationId);
    if (!formation) return res.status(404).json({ message: "Formation introuvable" });

    // Création session Stripe
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

      // 📌 Très important : metadata !
      metadata: {
        userId,
        formationId,
      },
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Erreur Stripe session:", error);
    return res.status(500).json({ message: error.message });
  }
};

// -------------------------
// 2️⃣ Webhook Stripe : déclenché AUTOMATIQUEMENT après paiement
// -------------------------
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 🎉 Paiement réussi
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details.email;
    const formationId = session.metadata.formationId;

    console.log("🎉 Paiement validé pour :", email, "formation:", formationId);

    const pdfFile = PDF_MAP[formationId];

    // Chemin du pdf
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "..", "utils", "pdfs", "generated", pdfFile);

    // Envoi email
    await sendMail({
      to: email,
      subject: "Votre formation Atelier Signature",
      html: `<h2>Merci pour votre achat 💖</h2><p>Votre PDF est en pièce jointe.</p>`,
      attachmentsPaths: [filePath],
    });

    console.log("📨 Email envoyé !");
  }

  res.status(200).send("OK");
};
