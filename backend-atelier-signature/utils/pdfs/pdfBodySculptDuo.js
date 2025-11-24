import PDFDocument from "pdfkit";
import fs from "fs";

export function generateBodySculptDuoPDF(outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 50,
        autoFirstPage: false,
      });

      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      const TITLE = "Body Sculpt Duo – Guide Formation";
      const COLORS = {
        background: "#FAFAFA",
        textMain: "#111111",
        textSecondary: "#666666",
        accent: "#EAEAEA",
      };

      let pageNumber = 0;

      const addStyledPage = () => {
        doc.addPage();
        pageNumber += 1;

        // Fond
        doc.save();
        doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.background);
        doc.restore();

        // Header
        doc
          .font("Helvetica")
          .fontSize(11)
          .fillColor(COLORS.textMain)
          .text("L’Atelier Signature", 50, 35);

        doc
          .fontSize(9)
          .fillColor(COLORS.textSecondary)
          .text(TITLE, 50, 50);

        // Ligne accent
        doc
          .moveTo(50, 70)
          .lineTo(doc.page.width - 50, 70)
          .lineWidth(1)
          .strokeColor(COLORS.accent)
          .stroke();

        // Footer (numéro de page)
        doc
          .fontSize(8)
          .fillColor(COLORS.textSecondary)
          .text(`Page ${pageNumber}`, 0, doc.page.height - 40, {
            align: "center",
          });

        // Position du contenu
        doc.x = 60;
        doc.y = 90;
      };

      // ---- PAGE 1 : INTRO + OBJECTIF ----
      addStyledPage();

      doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .fillColor(COLORS.textMain)
        .text("Introduction", { paragraphGap: 12 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.textSecondary)
        .text(
          "Le protocole Body Sculpt Duo est un soin corps haut de gamme combinant vacuum et techniques manuelles pour sculpter, lisser et raffermir la silhouette.",
          { lineGap: 5 }
        )
        .moveDown(1.5);

      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .fillColor(COLORS.textMain)
        .text("Objectifs du soin", { paragraphGap: 6 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.textSecondary)
        .list(
          [
            "Réduire la cellulite et améliorer la fermeté de la peau.",
            "Stimuler la circulation sanguine et lymphatique.",
            "Lisser et tonifier visiblement les zones traitées.",
          ],
          { bulletRadius: 2, textIndent: 8, lineGap: 3 }
        )
        .moveDown(1.5);

      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .text("Durée & matériel", { paragraphGap: 6 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .text("Durée recommandée :", { continued: true })
        .fillColor(COLORS.textSecondary)
        .text(" 30 minutes par zone.", { lineGap: 6 });

      doc
        .fillColor(COLORS.textSecondary)
        .list(
          [
            "Appareil Body Sculpt Duo (Vacuum / dépressothérapie).",
            "Gel conducteur ou huile adaptée.",
            "Serviette / drap de protection et sous-vêtements jetables.",
          ],
          { bulletRadius: 2, textIndent: 8, lineGap: 3 }
        );

      // ---- PAGE 2 : PRÉPARATION ----
      addStyledPage();

      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor(COLORS.textMain)
        .text("Préparation du soin (5 à 10 minutes)", { paragraphGap: 10 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.textSecondary)
        .list(
          [
            "Installer la cliente confortablement sur la table de soin.",
            "Vérifier la zone à traiter : peau propre, sèche, sans lésions.",
            "Expliquer le déroulement du soin, les sensations possibles et les résultats attendus.",
            "Appliquer une fine couche de gel conducteur ou d’huile adaptée.",
          ],
          { bulletRadius: 2, textIndent: 8, lineGap: 4 }
        );

      doc.moveDown(2);

      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .fillColor(COLORS.textMain)
        .text("Zones possibles :", { paragraphGap: 6 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.textSecondary)
        .list(
          [
            "Cuisses (face externe, interne et arrière).",
            "Fesses et hanches (culotte de cheval).",
            "Ventre et taille.",
            "Bras (face interne).",
            "Dos (selon protocole et besoins).",
          ],
          { bulletRadius: 2, textIndent: 8, lineGap: 3 }
        );

      // ---- PAGE 3 : PROTOCOLE ----
      addStyledPage();

      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor(COLORS.textMain)
        .text("Déroulé du soin par zone", { paragraphGap: 10 });

      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .fillColor(COLORS.textMain)
        .text("1️⃣ Phase Vacuum – 15 minutes", { paragraphGap: 6 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.textSecondary)
        .text("Objectif : drainage, mobilisation des tissus, stimulation circulatoire.", {
          lineGap: 4,
        })
        .moveDown(0.5)
        .list(
          [
            "Commencer avec une intensité modérée, puis adapter selon la sensibilité.",
            "Effectuer des mouvements lents et réguliers, toujours orientés vers le cœur.",
            "Insister sur les zones présentant capitons, amas graisseux ou relâchement.",
            "Vérifier régulièrement le confort de la cliente.",
          ],
          { bulletRadius: 2, textIndent: 8, lineGap: 3 }
        )
        .moveDown(1.5);

      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .fillColor(COLORS.textMain)
        .text("2️⃣ Palper-Rouler manuel – 10 minutes", { paragraphGap: 6 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.textSecondary)
        .list(
          [
            "Pincer la peau entre les doigts pour créer un pli cutané.",
            "Rouler ce pli de façon régulière, en remontant vers le cœur.",
            "Adapter la pression selon la tolérance de la cliente.",
            "Conserver un rythme fluide et continu.",
          ],
          { bulletRadius: 2, textIndent: 8, lineGap: 3 }
        )
        .moveDown(1.5);

      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .fillColor(COLORS.textMain)
        .text("3️⃣ Finitions – 5 minutes", { paragraphGap: 6 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.textSecondary)
        .list(
          [
            "Retirer l’excédent de gel ou d’huile avec une serviette propre.",
            "Réaliser un massage léger pour relaxer la zone.",
            "Donner les conseils post-soin : hydratation, boire de l’eau, éviter chaleur intense (sauna, hammam) le jour-même.",
          ],
          { bulletRadius: 2, textIndent: 8, lineGap: 3 }
        );

      // ---- PAGE 4 : FRÉQUENCE, BÉNÉFICES & TARIFS ----
      addStyledPage();

      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor(COLORS.textMain)
        .text("Fréquence & protocole de cure", { paragraphGap: 10 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.textSecondary)
        .list(
          [
            "1 à 2 séances par semaine selon l’objectif et la zone.",
            "Cure recommandée : 6 à 8 séances minimum.",
            "Entretien : 1 séance par mois pour maintenir les résultats.",
          ],
          { bulletRadius: 2, textIndent: 8, lineGap: 3 }
        )
        .moveDown(2);

      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor(COLORS.textMain)
        .text("Bénéfices visibles pour la cliente", { paragraphGap: 10 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.textSecondary)
        .list(
          [
            "Lissage de l’aspect « peau d’orange ». ",
            "Amélioration de la fermeté et de la tonicité.",
            "Sensation de légèreté et de drainage.",
            "Silhouette visuellement plus harmonieuse.",
          ],
          { bulletRadius: 2, textIndent: 8, lineGap: 3 }
        )
        .moveDown(2);

      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor(COLORS.textMain)
        .text("Positionnement tarifaire haut de gamme", { paragraphGap: 10 });

      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(COLORS.textSecondary)
        .list(
          [
            "Séance 30 min par zone : 90 € – 120 €.",
            "Cure 6 séances par zone : 480 € – 650 €.",
            "Ajout de zones supplémentaires : +30 à +40 € par zone.",
          ],
          { bulletRadius: 2, textIndent: 8, lineGap: 3 }
        );

      doc.end();

      stream.on("finish", () => resolve(outputPath));
      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
}
