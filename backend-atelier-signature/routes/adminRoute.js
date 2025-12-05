import express from "express";
import { adminLogin, getAdminOrders } from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/orders", verifyAdmin, getAdminOrders);

export default router;
