import { Link } from "react-router-dom";
import "../styles/style.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-animated text-[#111111]">

    
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        
          <div>
            <p className="uppercase tracking-[0.3em] text-xs mb-4">L’ATELIER SIGNATURE</p>

            <h1 className="text-5xl font-light leading-tight mb-6">
              Formations Esthétiques
              <br />
              <span className="font-semibold">Haut de Gamme</span>
            </h1>

            <p className="text-[#444444] text-sm mb-8 max-w-md">
              Développez votre expertise grâce à nos formations premium : technologie esthétique,
              protocoles avancés et accompagnement professionnel.
            </p>

            <Link
              to="/formations"
              className="px-7 py-3 rounded-full bg-black text-white text-sm tracking-wide uppercase hover:bg-gray-800 transition inline-block"
            >
              Découvrir les formations
            </Link>
          </div>

        
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E6D5C5]">
              <img
                src="/assets/visagepageaccueil.jpg"
                alt="Formation Esthétique"
                className="w-full h-full object-cover"
              />
            </div>

            
          </div>
        </div>
      </section>

    
      <section className="text-center py-10">
        <h2 className="text-2xl font-light mb-4">Prête à transformer votre expertise ?</h2>
        <Link
          to="/formations"
          className="px-6 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition"
        >
          Voir nos formations
        </Link>
      </section>
    </div>
  );
}
