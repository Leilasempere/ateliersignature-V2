// controllers/adminController.js
import { Formation } from "../models/formationModel.js";
import { User } from "../models/userModel.js";
import { Order } from "../models/orderModel.js";
import pool from "../config/db.js";

export const getOverview = async (req, res) => {
  try {
    const [[{ totalRevenue }]] = await pool.query(
      "SELECT IFNULL(SUM(amount), 0) AS totalRevenue FROM commandes"
    );
    const [[{ totalOrders }]] = await pool.query(
      "SELECT COUNT(*) AS totalOrders FROM commandes"
    );
    const [[{ totalUsers }]] = await pool.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );
    const [[{ totalFormations }]] = await pool.query(
      "SELECT COUNT(*) AS totalFormations FROM formations"
    );

    res.json({
      totalRevenue,
      totalOrders,
      totalUsers,
      totalFormations,
    });
  } catch (err) {
    console.error("Erreur getOverview admin :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// FORMATIONS
export const getAdminFormations = async (req, res) => {
  try {
    const formations = await Formation.findAll();
    res.json(formations);
  } catch (err) {
    console.error("Erreur getAdminFormations:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const createFormation = async (req, res) => {
  try {
    const { title, description, price, detailed_formation, image_url } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Titre et prix sont obligatoires." });
    }

    const id = await Formation.create({
      title,
      description,
      price,
      detailed_formation,
      image_url,
    });

    res.status(201).json({ id });
  } catch (err) {
    console.error("Erreur createFormation:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateFormation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, detailed_formation, image_url } = req.body;

    await Formation.update(id, {
      title,
      description,
      price,
      detailed_formation,
      image_url,
    });

    res.json({ message: "Formation mise à jour." });
  } catch (err) {
    console.error("Erreur updateFormation:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteFormation = async (req, res) => {
  try {
    const { id } = req.params;
    await Formation.delete(id);
    res.json({ message: "Formation supprimée." });
  } catch (err) {
    console.error("Erreur deleteFormation:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// COMMANDES
export const getAdminOrders = async (req, res) => {
  try {
    const { dateFrom, dateTo, formationId } = req.query;
    const orders = await Order.findAll({ dateFrom, dateTo, formationId });
    res.json(orders);
  } catch (err) {
    console.error("Erreur getAdminOrders:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// UTILISATEURS
export const getAdminUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, firstName, lastName, email, isVerified, role, date_creation FROM users ORDER BY date_creation DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Erreur getAdminUsers:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.findByUserId(id);
    res.json(orders);
  } catch (err) {
    console.error("Erreur getUserOrders:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
