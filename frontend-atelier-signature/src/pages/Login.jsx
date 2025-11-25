import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect");
  const formationId = new URLSearchParams(location.search).get("formation");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);

    if (!success) {
      setError("Identifiants incorrects.");
      return;
    }

    // ⭐️ Après login, retour sur la fiche formation
    if (redirect === "buy" && formationId) {
      return navigate(`/formations/${formationId}`);
    }

    navigate("/");
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

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Pas de compte ?{" "}
          <Link
            to={`/register?redirect=${redirect}&formation=${formationId}`}
            className="text-black underline"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
