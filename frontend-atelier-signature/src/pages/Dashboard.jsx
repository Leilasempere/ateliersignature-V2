import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex">

      <aside className="w-64 bg-[#111] text-white p-6 space-y-6">
        <h2 className="text-xl font-semibold tracking-wide uppercase">
          Admin Panel
        </h2>

        <nav className="space-y-4">
          <Link to="/dashboard/formations" className="block hover:text-gray-300">📚 Formations</Link>
          <Link to="/dashboard/commandes" className="block hover:text-gray-300">💰 Commandes</Link>
          <Link to="/dashboard/utilisateurs" className="block hover:text-gray-300">👤 Utilisateurs</Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
