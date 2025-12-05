import express from "express";
import { getOrders } from "../controllers/adminController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/orders", verifyToken, verifyAdmin, getOrders);

export default router;
