import { useEffect, useState } from "react";
import { getFormations } from "../services/formation";
import { Link } from "react-router-dom";

export default function FormationsList() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFormations()
      .then(setFormations)
      .catch((err) => console.error("Erreur chargement formations :", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10">Chargement des formations...</p>
    );

  return (
    <div>

      {/* SECTION HERO PREMIUM */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <img
          src="/public/assets/photoFormation1.jpg"  
          alt="Soins esthétiques premium"
          className="w-full h-full object-cover opacity-90"
        />

        {/* Dégradé luxe */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F5F2] via-transparent to-transparent"></div>

        {/* Texte au centre */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Sublimez Votre Expertise
          </h1>

          <p className="text-lg text-white mt-4 drop-shadow-md">
            Formations premium – Technologies Esthétiques & Bien-être
          </p>

          <a
            href="#formations"
            className="mt-8 px-8 py-3 bg-white text-[#8B6C58] font-semibold rounded-full shadow-md hover:bg-[#F9F5F2] transition-all"
          >
            Découvrir nos formations
          </a>
        </div>
      </section>

      {/* SECTION LISTE DES FORMATIONS */}
      <div id="formations" className="p-6 mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Nos Formations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formations.map((formation) => (
            <div
              key={formation.id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
              <p className="text-gray-600 mb-4">{formation.description}</p>

              <Link
                to={`/formations/${formation.id}`}
                className="bg-black text-white px-4 py-2 rounded-lg block text-center hover:bg-gray-800 transition"
              >
                Voir le détail
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
