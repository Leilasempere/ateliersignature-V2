import express from "express";
import { adminLogin, getOrders } from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

// LOGIN ADMIN
router.post("/login", adminLogin);

// OBTENIR COMMANDES (protégé)
router.get("/orders", adminAuth, getOrders);

export default router;
