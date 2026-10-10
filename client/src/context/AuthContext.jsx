import { useState, createContext } from "react";
import { API_BASE_URL } from "../utilities/constants";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      return payload?.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return isTokenValid(localStorage.getItem("token"));
  });

  const login = async (credentials) => {
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

      const { isSuccess, data } = await response.json();

      if (isSuccess && data?.token) {
        const isAuthenticated = isTokenValid(data.token);

        if (isAuthenticated) {
          localStorage.setItem("token", data.token);
          setIsAuthenticated(isAuthenticated);
        }
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
