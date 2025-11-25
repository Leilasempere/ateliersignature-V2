import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function BuyButton({ formation }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBuy = async () => {
    // Si utilisateur NON connecté → redirection vers login + stop
    if (!user) {
      return navigate(`/login?redirect=buy&formation=${formation.id}`);
    }

    // Sauvegarde l'ID de la formation SEULEMENT SI utilisateur connecté
    localStorage.setItem("lastFormationId", formation.id);

    try {
      // Demande une session Stripe au backend
      const { data } = await axios.post(
        "https://latelier-signature.onrender.com/api/payments/create-checkout-session",
        {
          formationId: formation.id,
          userId: user.id,
        }
      );

      //Redirige vers Stripe Checkout
      window.location.href = data.url;

    } catch (error) {
      console.error("Erreur paiement :", error);
      alert("Erreur lors de la création du paiement.");
    }
  };

  return (
    <button
      onClick={handleBuy}
      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
    >
      Acheter cette formation
    </button>
  );
}
