import { createContext, useState } from "react";
import { API_BASE_URL } from "../config/api";

const DashboardContext = createContext(null);

function DashboardProvider({ children }) {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardMetrics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardContext.Provider value={{ getDashboardMetrics, isLoading }}>
      {children}
    </DashboardContext.Provider>
  );
}

export { DashboardContext, DashboardProvider };
