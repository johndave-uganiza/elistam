import { createContext, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";

const TransactionContext = createContext(null);

function TransactionProvider({ children }) {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const getTransactions = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/transaction`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result?.isSuccess) return result;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TransactionContext.Provider value={{ getTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionContext, TransactionProvider };
