import express from "express";
import { createCommande, getCommandes, getCommandeById } from "../controllers/commandeController.js";

const router = express.Router();

router.post("/", createCommande);      
router.get("/", getCommandes);         // Lister
router.get("/:id", getCommandeById);   // Détail 

export default router;
