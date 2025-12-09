import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("Token détecté :", token);

    const load = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/api/admin/orders",
          {
            headers: { Authorization: "Bearer " + token }
          }
        );

        console.log("Commandes reçues :", res.data);
        setOrders(res.data);

      } catch (err) {
        console.error("Erreur chargement commandes :", err.response?.data || err);
      }
    };

    if (token) load();
  }, [token]);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Dashboard Admin — Commandes</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Date</th>
            <th className="p-3">Email</th>
            <th className="p-3">Formation</th>
            <th className="p-3">Statut</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-3">
                {new Date(o.date_creation).toLocaleDateString("fr-FR")}
              </td>

              <td className="p-3">{o.user_email}</td>
              <td className="p-3">{o.formation_title}</td>
              <td className="p-3">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
