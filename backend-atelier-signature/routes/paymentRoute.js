import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controllers/paymentController.js";

const router = express.Router();

// ⚠️ Stripe Webhook → nécessite RAW body
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// Création de session Stripe (Checkout)
router.post("/create-checkout-session", createCheckoutSession);

export default router;
