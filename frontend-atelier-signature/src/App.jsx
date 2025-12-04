import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormationsList from "./pages/FormationsList";
import FormationDetail from "./pages/FormationDetail";
import { AuthProvider } from "./context/AuthContext";
import Success from "./pages/Success";   
import Cancel from "./pages/Cancel";   
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import AdminFormations from "./pages/admin/AdminFormations";
import AdminCommandes from "./pages/admin/AdminCommandes";
import AdminUsers from "./pages/admin/AdminUsers";



import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formations" element={<FormationsList />} />
          <Route path="/formations/:id" element={<FormationDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/formations" element={<AdminFormations />} />
          <Route path="/dashboard/commandes" element={<AdminCommandes />} />
          <Route path="/dashboard/utilisateurs" element={<AdminUsers />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
