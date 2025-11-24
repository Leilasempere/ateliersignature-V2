import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Success() {
  const { user } = useAuth();

  useEffect(() => {
    const sendEmail = async () => {
      try {
        const formationId = localStorage.getItem("lastFormationId");
        const email = user?.email;

        console.log("🔍 FRONT — Vérification :", { formationId, email });

        if (!formationId) {
          console.log("⛔ Pas de formationId trouvé");
          return;
        }

        if (!email) {
          console.log("⛔ Pas d'email user — attente 1 seconde…");
          setTimeout(sendEmail, 1000);
          return;
        }

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/payments/success`,
          {
            email,
            formationId: Number(formationId),
          }
        );

        console.log("📨 Email envoyé depuis le FRONT :", res.data);

        localStorage.removeItem("lastFormationId");

      } catch (error) {
        console.error("❌ Erreur envoi email depuis success :", error);
      }
    };

    sendEmail();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-green-600">Paiement réussi</h1>
      <p className="mt-4 text-gray-600">Merci pour votre achat !</p>
    </div>
  );
}
