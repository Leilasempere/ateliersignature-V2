import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function BuyButton({ formation }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBuy = async () => {
    
    localStorage.setItem("lastFormationId", formation.id);

    
    if (!user) {
      return navigate("/login");
    }

    
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_API_URL + "/api/payments/create-checkout-session",
        {
          formationId: formation.id,
          userId: user.id,
        }
      );

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Erreur de paiement");
    }
  };

  return (
    <button
      onClick={handleBuy}
      className="bg-black text-white px-6 py-3 rounded-lg"
    >
      Acheter cette formation
    </button>
  );
}
