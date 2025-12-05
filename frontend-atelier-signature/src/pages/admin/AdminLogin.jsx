import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Identifiants administrateur incorrects");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F5F2]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-light mb-6 text-center tracking-wide">
          Connexion Admin
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email admin"
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-black text-white py-3 rounded-lg">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
