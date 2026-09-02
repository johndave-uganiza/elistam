import { useState, createContext } from "react";
import { API_BASE_URL } from "../utilities/constants";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  async function login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email || "",
          password: credentials.password || "",
        }),
      });

      const result = await response.json();

      if (result.isSuccess && result.data && result.data.token) {
        localStorage.setItem("token", result.data.token);
        setToken(result.data.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
