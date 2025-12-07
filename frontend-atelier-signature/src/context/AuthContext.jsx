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

  const login = async (email, password) => {
  const res = await fetch(import.meta.env.VITE_API_URL + "/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) return null;

  const data = await res.json();

  const user = {
    id: data.user.id,
    email: data.user.email,
    role: data.user.role
  };

  setUser(user);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", data.token);

  return user; // 🔥 retourne le user complet
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
