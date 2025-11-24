import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { generateBodySculptDuoPDF } from "./pdfBodySculptDuo.js";
import { generateDermaSkinGlowPDF } from "./pdfDermaSkinGlow.js";
import { generateVacuoLiftPDF } from "./pdfVacuoLift.js";

// Récupération du bon __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateAll() {
  try {
    const outputDir = path.join(__dirname, "generated");

    // Création du dossier "generated" s'il n'existe pas
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("🔧 Génération des PDF en cours...");

    // Génération Body Sculpt Duo
    const file1 = path.join(outputDir, "pdfBodySculptDuo.pdf");
    await generateBodySculptDuoPDF(file1);
    console.log("✅ pdfBodySculptDuo.pdf généré");

    // Génération DermaSkinGlow
    const file2 = path.join(outputDir, "pdfDermaSkinGlow.pdf");
    await generateDermaSkinGlowPDF(file2);
    console.log("✅ pdfDermaSkinGlow.pdf généré");

    // Génération VacuoLift
    const file3 = path.join(outputDir, "pdfVacuoLift.pdf");
    await generateVacuoLiftPDF(file3);
    console.log("✅ pdfVacuoLift.pdf généré");

    console.log("\n🎉 Tous les PDF ont été générés avec succès !");
  } catch (error) {
    console.error("❌ Erreur génération PDF :", error);
  }
}

generateAll();
