import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Success() {
  const { user } = useAuth();

  useEffect(() => {
    const sendEmail = async () => {
      try {
        const formationId = localStorage.getItem("lastFormationId"); // récupère l'id
        if (!formationId || !user?.email) return;

        await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/success`, {
          email: user.email,
          formationId: Number(formationId),
        });

        console.log("Email avec PDF envoyé !");
        localStorage.removeItem("lastFormationId"); // nettoyer
      } catch (error) {
        console.error("Erreur envoi email:", error);
      }
    };

    sendEmail();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-green-600">Paiement réussi</h1>
      <p className="mt-4 text-gray-600">Merci pour votre achat !</p>
      <p className="mt-2 text-gray-600">Vous allez recevoir un email avec votre formation en PDF.</p>
      <p className="mt-2 text-gray-600">Si vous ne le voyez pas, vérifiez votre dossier spam.</p>
      <p className="mt-2 text-gray-600">Merci de votre confiance !</p>
      <p className="mt-6 text-sm text-gray-500">L’Atelier Signature</p>
    </div>
  );
}
