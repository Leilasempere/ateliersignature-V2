import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white text-black py-5 px-6 md:px-8 shadow-sm border-b border-gray-100 sticky top-0 z-50">

    
      <div className="flex justify-between items-center">

      
        <Link to="/" className="select-none">
          <p
            className="uppercase tracking-[0.3em] text-sm"
            style={{ fontFamily: "Helvetica Neue, sans-serif", color: "#111111" }}
          >
            L’ATELIER SIGNATURE
          </p>
        </Link>

      
        <nav
          className="hidden md:flex items-center gap-8 text-gray-700"
          style={{ fontFamily: "Helvetica Neue, sans-serif" }}
        >
          <Link to="/formations" className="hover:text-black transition">Formations</Link>

          <a
            href="https://www.instagram.com/latelier_signature_ls?igsh=NXk2ZmxwaTJjY2hz&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition flex items-center"
          >
            <img src="/assets/logo-instagram.png" alt="Instagram" className="w-5 h-5" />
          </a>

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

      
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </div>

    
      {open && (
        <nav
          className="md:hidden flex flex-col gap-4 mt-5 pb-5 border-t border-gray-200 pt-5 text-gray-700"
          style={{ fontFamily: "Helvetica Neue, sans-serif" }}
        >
          <Link to="/formations" className="hover:text-black transition" onClick={() => setOpen(false)}>Formations</Link>

          <a
            href="https://www.instagram.com/latelier_signature_ls"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition flex items-center"
            onClick={() => setOpen(false)}
          >
            <img src="/assets/logo-instagram.png" alt="Instagram" className="w-5 h-5 mr-2" />
            Instagram
          </a>

          {!user && (
            <>
              <Link to="/login" className="hover:text-black transition" onClick={() => setOpen(false)}>
                Connexion
              </Link>
              <Link to="/register" className="hover:text-black transition" onClick={() => setOpen(false)}>
                Inscription
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition w-full"
            >
              Déconnexion
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
