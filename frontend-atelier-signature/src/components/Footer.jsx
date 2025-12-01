import { useState } from "react";
import axios from "axios";

export default function Footer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/api/contact", form);
      setStatus("Message envoyé avec succès !");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus("Erreur lors de l’envoi du message.");
    }
  };

  return (
    <footer className="bg-white text-black border-t border-gray-200 mt-16">

      <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">


        <div>
          <h2
            className="text-2xl font-light tracking-wide mb-3"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            L’Atelier Signature
          </h2>

          <p
            className="text-gray-600 text-sm"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            Formations premium en esthétique & technologies avancées.
          </p>
        </div>


        <div>
          <h3
            className="text-lg font-normal mb-3"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            Navigation
          </h3>

          <ul
            className="text-gray-700 space-y-2 text-sm"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            <li><a href="/" className="hover:text-black transition">Formations</a></li>
            <li><a href="/login" className="hover:text-black transition">Connexion</a></li>
            <li><a href="/register" className="hover:text-black transition">Inscription</a></li>
          </ul>
        </div>


        <div>
          <h3
            className="text-lg font-normal mb-3"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            Nous suivre
          </h3>

          <a
            href="https://www.instagram.com/studio64beautycorner?igsh=NXk2ZmxwaTJjY2hz&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:opacity-70 transition"
          >
            <img
              src="/public/assets/logo-instagram.png"
              alt="Instagram"
              className="w-6 h-6 mr-2"
            />
            <span style={{ fontFamily: "Helvetica Neue, sans-serif" }}>Instagram</span>
          </a>

          <div className="mt-4 text-gray-700 text-sm">
            <p style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
              contact@atelier-signature-formation.fr
            </p>
          </div>
        </div>
      </div>


      <div className="bg-[#F9F5F2] border-t border-gray-200 py-12 px-6">
        <div className="max-w-4xl mx-auto">

          <h2
            className="text-3xl font-light tracking-wide text-center mb-10"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            Nous contacter
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-xl shadow-md border border-gray-200"
          >
            <input
              name="name"
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Votre email"
              value={form.email}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              name="phone"
              type="text"
              placeholder="Téléphone (optionnel)"
              value={form.phone}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              name="subject"
              type="text"
              placeholder="Objet du message"
              value={form.subject}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <textarea
              name="message"
              placeholder="Votre message"
              value={form.message}
              onChange={handleChange}
              className="border p-3 rounded-lg md:col-span-2 h-32"
              required
            />

            <button
              type="submit"
              className="md:col-span-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition tracking-wide"
              style={{ fontFamily: "Helvetica Neue, sans-serif" }}
            >
              Envoyer le message
            </button>
          </form>

          {status && (
            <p className="text-center mt-4 text-lg"
               style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
              {status}
            </p>
          )}
        </div>
      </div>

    
      <div className="text-center py-4 border-t border-gray-200">
        <p
          className="text-gray-500 text-xs"
          style={{ fontFamily: "Helvetica Neue, sans-serif" }}
        >
          © {new Date().getFullYear()} L’Atelier Signature — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
