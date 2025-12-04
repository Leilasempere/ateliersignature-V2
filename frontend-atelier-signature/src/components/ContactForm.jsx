import { useState } from "react";
import axios from "axios";

export default function ContactForm() {
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
    setStatus("Envoi en cours...");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        form
      );

      setStatus("Message envoyé avec succès !");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Erreur lors de l’envoi du message.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FAFAFA] p-8 rounded-xl shadow-md space-y-4 border"
    >
      <h3 className="text-xl font-semibold tracking-wide mb-4">
        Formulaire de contact
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Votre nom"
          className="border p-3 rounded"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Votre email"
          className="border p-3 rounded"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Téléphone"
          className="border p-3 rounded"
        />
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Objet du message"
          className="border p-3 rounded"
          required
        />
      </div>

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Votre message"
        rows="5"
        className="border p-3 rounded w-full"
        required
      ></textarea>

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Envoyer
      </button>

      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
