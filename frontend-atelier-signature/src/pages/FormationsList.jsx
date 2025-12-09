import { useEffect, useState } from "react";
import { getFormations } from "../services/formation";
import { Link } from "react-router-dom";

export default function FormationsList() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const formationImages = {
    1: "/assets/photoFormation1.jpg",
    2: "/assets/photomassage.jpg",
    3: "/assets/photoFormation3.jpg",
  };

  useEffect(() => {
    getFormations()
      .then(setFormations)
      .catch((err) => console.error("Erreur chargement formations :", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg">Chargement des formations...</p>
    );

  return (
    <div className="bg-[#F9F5F2] min-h-screen pb-20">

    
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">

        <img
          src="/assets/visagepageaccueil.jpg"
          alt="Soin esthétique"
          className="w-full h-full object-cover opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F5F2] via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="uppercase tracking-[0.3em] text-sm text-white drop-shadow-md">
            L’ATELIER SIGNATURE
          </p>

          <h1 className="text-5xl font-light text-white drop-shadow-xl">
            Sublimez Votre Expertise
          </h1>

          <p className="text-lg text-white mt-4 drop-shadow-md">
            Formations premium • Technologies Esthétiques & Bien-être
          </p>

          <a
            href="#formations"
            className="mt-8 px-10 py-3 bg-white text-[#8B6C58] font-medium rounded-full shadow-md hover:bg-[#F0E9E4] transition-all"
          >
            Découvrir nos formations
          </a>
        </div>
      </section>

    
      <div id="formations" className="px-6 mt-16 max-w-7xl mx-auto">
        <h2
          className="text-center text-3xl md:text-4xl font-light mb-12"
          style={{ fontFamily: "Helvetica Neue, sans-serif" }}
        >
          Découvrez nos formations professionnelles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {formations.map((formation) => (
            <div
              key={formation.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100 group"
            >
              <div className="relative">
                <img
                  src={formationImages[formation.id]}
                  alt={formation.title}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3
                  className="text-xl font-semibold mb-2 text-[#111]"
                  style={{ fontFamily: "Helvetica Neue, sans-serif" }}
                >
                  {formation.title}
                </h3>

                <p className="hidden">{formation.description}</p>

                <p className="text-lg font-semibold text-[#8B6C58] mb-4">
                  {formation.price} €
                </p>

                <Link
                  to={`/formations/${formation.id}`}
                  className="block text-center bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                  Voir le détail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
