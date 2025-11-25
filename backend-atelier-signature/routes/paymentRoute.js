import express from "express";

import { createCheckoutSession, paymentSuccess } from "../controllers/paymentController.js";

const router = express.Router();



// Session checkout
router.post("/create-checkout-session", createCheckoutSession);
router.post("/success", paymentSuccess);

export default router;
