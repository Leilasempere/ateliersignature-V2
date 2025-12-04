// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [formations, setFormations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // on suppose que tu stockes le JWT ici

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;

        const [ovRes, fRes, oRes, uRes] = await Promise.all([
          axios.get(`${api}/api/admin/overview`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${api}/api/admin/formations`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${api}/api/admin/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${api}/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setOverview(ovRes.data);
        setFormations(fRes.data);
        setOrders(oRes.data);
        setUsers(uRes.data);
      } catch (err) {
        console.error("Erreur chargement dashboard admin :", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchAll();
  }, [token]);

  if (!token) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-6">
        <p className="text-center text-gray-700">
          Vous devez être connecté(e) en tant qu’<b>admin</b> pour accéder au dashboard.
        </p>
      </div>
    );
  }

  if (loading || !overview) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        Chargement du dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F5F2] py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Titre */}
        <div className="mb-10">
          <p className="uppercase tracking-[0.3em] text-xs mb-2 text-gray-500">
            L’ATELIER SIGNATURE
          </p>
          <h1 className="text-3xl font-light text-[#111111]">
            Dashboard administrateur
          </h1>
        </div>

        {/* CARTES RESUMÉ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard label="CA total" value={`${overview.totalRevenue} €`} />
          <StatCard label="Commandes" value={overview.totalOrders} />
          <StatCard label="Utilisateurs" value={overview.totalUsers} />
          <StatCard label="Formations" value={overview.totalFormations} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORMATIONS */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-1 lg:col-span-1">
            <h2 className="text-lg font-medium mb-4">Formations</h2>
            <ul className="space-y-3 max-h-80 overflow-y-auto">
              {formations.map((f) => (
                <li
                  key={f.id}
                  className="flex justify-between items-center text-sm border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="font-medium">{f.title}</p>
                    <p className="text-gray-500 text-xs">
                      {f.price} € · ID {f.id}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* COMMANDES */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-1 lg:col-span-2">
            <h2 className="text-lg font-medium mb-4">Dernières commandes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="border-b text-gray-500">
                  <tr>
                    <th className="py-2">Date</th>
                    <th className="py-2">Client</th>
                    <th className="py-2">Formation</th>
                    <th className="py-2 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map((o) => (
                    <tr key={o.id} className="border-b last:border-none">
                      <td className="py-2">
                        {new Date(o.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="py-2">
                        {o.user_email || "Non lié"}{" "}
                        {o.firstName && `(${o.firstName} ${o.lastName || ""})`}
                      </td>
                      <td className="py-2">{o.formation_title}</td>
                      <td className="py-2 text-right">{o.amount} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* UTILISATEURS */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
          <h2 className="text-lg font-medium mb-4">Utilisateurs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="py-2">Nom</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Rôle</th>
                  <th className="py-2">Vérifié</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b last:border-none">
                    <td className="py-2">
                      {u.firstName} {u.lastName}
                    </td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">{u.role}</td>
                    <td className="py-2">
                      {u.isVerified ? "✅" : "❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-semibold text-[#111111]">{value}</p>
    </div>
  );
}
