console.log("🔥 AdminLogin.jsx chargé !");


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("📤 Tentative de connexion admin :", email);

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/admin/login",
        { email, password }
      );

      console.log("📥 Réponse du serveur :", res.data);

      // Stockage Token
      localStorage.setItem("token", res.data.token);
      console.log("💾 Token stocké :", localStorage.getItem("token"));

      console.log("➡️ Redirection vers /admin/dashboard …");
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("❌ Erreur Admin Login :", err.response?.data || err);
      setError("Identifiants incorrects");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F5F2]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center">Connexion Admin</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email admin"
          className="w-full border p-3 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border p-3 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded-lg">
          Connexion
        </button>
      </form>
    </div>
  );
}
