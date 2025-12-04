import { useState } from "react";
import ContactForm from "./ContactForm";

export default function Footer() {
  const [showContact, setShowContact] = useState(false);

  return (
    <footer className="bg-white text-black border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LOGO TEXTE PREMIUM */}
        <div>
          <p
            className="uppercase tracking-[0.3em] text-sm mb-3"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            L’ATELIER SIGNATURE
          </p>
          <p className="text-gray-600 text-sm">
            Formations premium en esthétique & technologies avancées.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3
            className="uppercase tracking-[0.2em] text-xs mb-3"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            Navigation
          </h3>

          <ul className="text-gray-700 space-y-2 text-sm">
            <li><a href="/" className="hover:text-black transition">Formations</a></li>
            <li><a href="/login" className="hover:text-black transition">Connexion</a></li>
            <li><a href="/register" className="hover:text-black transition">Inscription</a></li>
          </ul>
        </div>

        {/* SOCIAL + CONTACT */}
        <div>
          <h3
            className="uppercase tracking-[0.2em] text-xs mb-3"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            Nous suivre
          </h3>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/studio64beautycorner?igsh=NXk2ZmxwaTJjY2hz&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:opacity-70 transition mb-2"
          >
            <img
              src="/assets/logo-instagram.png"
              alt="Instagram"
              className="w-6 h-6 mr-2"
            />
            <span>Instagram</span>
          </a>

          {/* NOUS CONTACTER */}
          <button
            onClick={() => setShowContact(!showContact)}
            className="block text-left text-gray-700 hover:text-black transition text-sm mt-4 underline"
          >
            Nous contacter
          </button>
        </div>
      </div>

      {/* FORMULAIRE CONTACT ICI */}
      {showContact && (
        <div className="max-w-4xl mx-auto px-8 pb-10 animate-fadeIn">
          <ContactForm />
        </div>
      )}

      <div className="text-center py-4 border-t border-gray-200">
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} L’Atelier Signature — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
