import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BuyButton from "../components/BuyButton";

export default function FormationDetail() {
  const { id } = useParams();

  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/formations/${id}`)
      .then((res) => setFormation(res.data))
      .catch(() => console.error("Erreur récupération formation"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Chargement...</p>
    );

  if (!formation)
    return (
      <p className="text-center mt-10 text-red-500">
        Formation introuvable.
      </p>
    );

  return (
    <div className="min-h-screen bg-[#F9F5F2] py-16 px-6 flex justify-center">
      <div className="max-w-4xl bg-white shadow-xl rounded-2xl p-10 border border-gray-200">

        
        <h1
          className="text-4xl font-light mb-4 text-center tracking-wide"
          style={{ fontFamily: "Helvetica Neue, sans-serif" }}
        >
          {formation.title}
        </h1>

      
        {formation.image && (
          <img
            src={formation.image}
            alt={formation.title}
            className="w-full h-64 object-cover rounded-xl mb-8 shadow"
          />
        )}

        
        <p
          className="text-gray-700 text-lg leading-relaxed mb-8 text-center"
          style={{ fontFamily: "Helvetica Neue, sans-serif" }}
        >
          {formation.description}
        </p>

        
        <div className="flex justify-center mb-10">
          <p
            className="text-3xl font-semibold text-[#8B6C58]"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            {formation.price} €
          </p>
        </div>

      
        <div
          className="text-gray-700 text-base leading-relaxed whitespace-pre-line mb-10 prose prose-neutral max-w-none"
          dangerouslySetInnerHTML={{
            __html: formation.detailed_formation,
          }}
          style={{ fontFamily: "Helvetica Neue, sans-serif" }}
        ></div>

        
        <div className="flex justify-center">
          <BuyButton formation={formation} />
        </div>
      </div>
    </div>
  );
}

