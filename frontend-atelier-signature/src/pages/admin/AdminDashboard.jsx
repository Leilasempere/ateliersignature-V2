import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/api/admin/orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrders(res.data);
      } catch (err) {
        console.error("Erreur récupération commandes admin :", err);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Accès refusé. Connectez-vous en tant qu’admin.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F5F2] p-10">
      <h1 className="text-3xl font-light mb-8 tracking-wide">
        Dashboard Administrateur
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-medium mb-4">Commandes récentes</h2>

        <table className="w-full text-left text-sm">
          <thead className="border-b">
            <tr>
              <th>Email</th>
              <th>Formation</th>
              <th>Montant</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="py-3">{o.email}</td>
                <td>{o.formation_title}</td>
                <td>{o.amount} €</td>
                <td>{new Date(o.created_at).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="mt-6 bg-black text-white px-4 py-2 rounded-lg"
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/";
        }}
      >
        Déconnexion admin
      </button>
    </div>
  );
}
