import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white text-black py-5 px-8 flex justify-between items-center shadow-sm border-b border-gray-100">

      
      <Link to="/" className="select-none">
        <h1
          className="text-3xl font-light tracking-wide"
          style={{ fontFamily: "Helvetica Neue, sans-serif", color: "#111111" }}
        >
          L’Atelier Signature
        </h1>
      </Link>

      {/* NAVIGATION */}
      <nav
        className="flex items-center gap-8 text-gray-700"
        style={{ fontFamily: "Helvetica Neue, sans-serif" }}
      >
        <Link to="/" className="hover:text-black transition">Formations</Link>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/studio64beautycorner?igsh=NXk2ZmxwaTJjY2hz&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition flex items-center"
        >
          <img
            src="/public/assets/logo-instagram.png"
            alt="Instagram"
            className="w-6 h-6"
          />
        </a>

        {/* Auth */}
        {!user && (
          <>
            <Link to="/login" className="hover:text-black transition">Connexion</Link>
            <Link to="/register" className="hover:text-black transition">Inscription</Link>
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
