// scripts/createAdmin.js

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";

dotenv.config();

async function createAdmin() {
  try {
    const adminEmail = "admin@atelier-signature.fr"; 
    const password = "Admin2025!";

    // Vérifier si un admin existe déjà
    const existing = await User.findByEmail(adminEmail);
    if (existing.length > 0) {
      console.log("Un admin existe déjà avec cet email :", adminEmail);
      process.exit();
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const adminId = await User.create({
      firstName: "Admin",
      lastName: "Master",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isVerified: 1, 
    });

    console.log("ADMIN CRÉÉ AVEC SUCCÈS !");
    console.log("➡ Email :", adminEmail);
    console.log("➡ Mot de passe :", password);
    console.log("➡ ID :", adminId);

    process.exit();
  } catch (err) {
    console.error("Erreur création admin :", err);
    process.exit(1);
  }
}

createAdmin();
