import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white text-black py-5 px-8 flex justify-between items-center shadow-sm border-b border-gray-100">

      {/* LOGO TEXTE PREMIUM */}
      <Link to="/" className="select-none">
        <p
          className="uppercase tracking-[0.3em] text-sm"
          style={{ fontFamily: "Helvetica Neue, sans-serif", color: "#111111" }}
        >
          L’ATELIER SIGNATURE
        </p>
      </Link>

      {/* NAVIGATION */}
      <nav
        className="flex items-center gap-8 text-gray-700"
        style={{ fontFamily: "Helvetica Neue, sans-serif" }}
      >
        <Link to="/formations" className="hover:text-black transition">
          Formations
        </Link>

        

        {!user && (
          <>
            <Link to="/login" className="hover:text-black transition">
              Connexion
            </Link>
            <Link to="/register" className="hover:text-black transition">
              Inscription
            </Link>
          </>
        )}

        {user && (
          <button
            onClick={logout}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Déconnexion
          </button>
        )}
      </nav>
    </header>
  );
}
