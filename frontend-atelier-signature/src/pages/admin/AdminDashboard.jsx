import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  
  const token = localStorage.getItem("token");
  console.log("Token dans localStorage :", token);

  useEffect(() => {
    if (!token) {
      console.error("Aucun token trouvé, impossible d'appeler l'API admin.");
      return;
    }

    const loadOrders = async () => {
      try {
        const url = import.meta.env.VITE_API_URL + "/api/admin/orders";
        console.log("Appel API :", url);

        const headers = { Authorization: `Bearer ${token}` };
        console.log("Headers envoyés :", headers);

        const res = await axios.get(url, { headers });

        console.log("Commandes reçues :", res.data);
        setOrders(res.data);

      } catch (err) {
        console.error("Erreur API /admin/orders :", err.response?.data || err);
      }
    };

    loadOrders();
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
            <th className="p-3">Montant</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="p-3">{new Date(o.date_creation).toLocaleDateString("fr-FR")}</td>
              <td className="p-3">{o.user_email}</td>
              <td className="p-3">{o.formation_title}</td>
              <td className="p-3">{o.montant} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
