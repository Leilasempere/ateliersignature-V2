import Stripe from "stripe";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { sendMail } from "../utils/mailer.js";
import { Formation } from "../models/formationModel.js";
import { User } from "../models/userModel.js";
import { Order } from "../models/orderModel.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PDF_MAP = {
  1: "pdfBodySculptDuo.pdf",
  2: "pdfDermaSkinGlow.pdf",
  3: "pdfVacuoLift.pdf",
};

export const createCheckoutSession = async (req, res) => {
  try {
    const { formationId, userId } = req.body;

    if (!formationId || !userId) {
      return res.status(400).json({ message: "formationId & userId requis" });
    }

    const formation = await Formation.findById(formationId);
    if (!formation) return res.status(404).json({ message: "Formation introuvable" });

  
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

      
      metadata: {
        userId,
        formationId,
      },
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe session:", error);
    return res.status(500).json({ message: error.message });
  }
};

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
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details.email;
    const formationId = session.metadata.formationId;
    const amountTotal = session.amount_total / 100; // Stripe en cents
    const stripeSessionId = session.id;

    console.log("✅ Paiement validé pour :", email, "formation:", formationId);

    // 1️⃣ Récupérer l'utilisateur par email (s'il existe)
    let userId = null;
    try {
      const existing = await User.findByEmail(email);
      if (existing.length > 0) {
        userId = existing[0].id;
      }
    } catch (err) {
      console.error("Erreur recherche user via email dans webhook:", err);
    }

    // 2️⃣ Enregistrer la commande en BDD
    try {
      await Order.create({
        userId,
        formationId,
        amount: amountTotal,
        stripeSessionId,
      });
      console.log("💾 Commande enregistrée en BDD");
    } catch (err) {
      console.error("Erreur enregistrement commande BDD:", err);
    }

    // 3️⃣ Envoi du PDF (tu gardes ton code existant)
    const pdfFile = PDF_MAP[formationId];

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(
      __dirname,
      "..",
      "utils",
      "pdfs",
      "generated",
      pdfFile
    );

    try {
      await sendMail({
        to: email,
        subject: "Votre formation Atelier Signature",
        html: `<h2>Merci pour votre achat 💖</h2><p>Votre PDF est en pièce jointe.</p>`,
        attachmentsPaths: [filePath],
      });
      console.log("📨 Email envoyé avec PDF");
    } catch (err) {
      console.error("Erreur envoi mail via webhook:", err);
    }
  }

  res.status(200).send("OK");
};