import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = await login(email, password);

    if (!user) {
      setError("Identifiants incorrects.");
      return;
    }

    console.log("USER CONNECTÉ :", user);

  
    if (user.role === "admin") {
      console.log("Redirection ADMIN");
      return navigate("/admin/dashboard");
    }

  
    const formationId = localStorage.getItem("lastFormationId");

    if (formationId) {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_API_URL + "/api/payments/create-checkout-session",
          {
            formationId: Number(formationId),
            userId: user.id,
          }
        );

        localStorage.removeItem("lastFormationId");

        window.location.href = data.url;
        return;
      } catch (err) {
        console.error(err);
        setError("Erreur de redirection vers le paiement.");
        return;
      }
    }

  
    navigate("/formations");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Connexion</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <button className="w-full bg-black text-white p-3 rounded-lg">
            Se connecter
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Pas de compte ?{" "}
          <Link to="/register" className="text-black underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
