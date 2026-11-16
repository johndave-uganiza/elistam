import { createContext, useCallback, useState } from "react";
import { API_BASE_URL } from "../config/api";

const DashboardContext = createContext(null);

function DashboardProvider({ children }) {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardMetrics = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Dashboard request failed (${response.status})`);
      }

      return await response.json();
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  return (
    <DashboardContext.Provider value={{ getDashboardMetrics, isLoading }}>
      {children}
    </DashboardContext.Provider>
  );
}

export { DashboardContext, DashboardProvider };
