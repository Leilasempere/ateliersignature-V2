import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";

export default function Success() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    const sendEmail = async () => {
      if (!sessionId || !user) return;

      const formationId = localStorage.getItem("lastFormationId");
      if (!formationId) return;

      await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/success`, {
        email: user.email,
        formationId: Number(formationId),
      });

      localStorage.removeItem("lastFormationId");
    };

    sendEmail();
  }, [sessionId, user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-green-600">Paiement réussi</h1>
      <p className="mt-4 text-gray-600">Merci pour votre achat !</p>
    </div>
  );
}
