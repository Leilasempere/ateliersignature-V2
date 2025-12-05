import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages client
import Home from "./pages/Home";
import FormationsList from "./pages/FormationsList";
import FormationDetail from "./pages/FormationDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// ---- Layout Wrapper pour gérer Header/Footer dynamiquement ----
function Layout({ children }) {
  const location = useLocation();

  // Toutes les routes qui commencent par /admin n'affichent PAS Header/Footer
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}

      {children}

      {!isAdminRoute && <Footer />}
    </>
  );
}

// ---- App principale ----
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Client */}
            <Route path="/" element={<Home />} />
            <Route path="/formations" element={<FormationsList />} />
            <Route path="/formations/:id" element={<FormationDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
