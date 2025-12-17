export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F5F2] px-6">

      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg text-center border border-gray-200">

        <p className="uppercase tracking-[0.3em] text-xs mb-4 text-gray-600">
          L’ATELIER SIGNATURE
        </p>

        <h1 className="text-3xl font-semibold text-[#111111]">
          Paiement réussi 
        </h1>

        <p className="text-gray-600 mt-4 leading-relaxed">
          Merci pour votre confiance.  
          Votre formation a été envoyée par email 
        </p>

        <a
          href="/formations"
          className="inline-block mt-8 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Retour aux formations
        </a>
      </div>
    </div>
  );
}
