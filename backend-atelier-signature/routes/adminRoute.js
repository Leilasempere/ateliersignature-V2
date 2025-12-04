// routes/adminRoute.js
import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/admin.js";
import {
  getOverview,
  getAdminFormations,
  createFormation,
  updateFormation,
  deleteFormation,
  getAdminOrders,
  getAdminUsers,
  getUserOrders,
} from "../controllers/adminController.js";

const router = express.Router();

// toutes les routes ici sont protégées : JWT + admin
router.use(verifyToken, requireAdmin);

// Dashboard overview
router.get("/overview", getOverview);

// Formations
router.get("/formations", getAdminFormations);
router.post("/formations", createFormation);
router.put("/formations/:id", updateFormation);
router.delete("/formations/:id", deleteFormation);

// Commandes
router.get("/orders", getAdminOrders);

// Utilisateurs
router.get("/users", getAdminUsers);
router.get("/users/:id/orders", getUserOrders);

export default router;
