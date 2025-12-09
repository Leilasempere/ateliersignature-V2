import express from "express";
import { adminLogin, getOrders } from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();


router.post("/login", adminLogin);


router.get("/orders", adminAuth, getOrders);

export default router;
