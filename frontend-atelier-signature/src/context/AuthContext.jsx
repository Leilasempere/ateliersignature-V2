import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔄 Charger user depuis sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔐 Connexion
  const login = async (email, password) => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) return false;

    const data = await res.json();

    const cleanedUser = {
      id: data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email,
      role: data.user.role
    };

    setUser(cleanedUser);

    // ✅ STOCKAGE TEMPORAIRE : se supprime automatiquement quand on ferme l’onglet
    sessionStorage.setItem("user", JSON.stringify(cleanedUser));
    sessionStorage.setItem("token", data.token);

    return true;
  };

  // 📝 Inscription
  const register = async (firstName, lastName, email, password, confirmPassword) => {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      })
    });

    return res.ok;
  };

  // 🚪 Déconnexion
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
