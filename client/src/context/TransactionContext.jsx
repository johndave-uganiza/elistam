import { createContext, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";

const TransactionContext = createContext(null);

function TransactionProvider({ children }) {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const getTransactions = async () => {
    setIsLoading(true);

    try {
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

  const exportTransaction = async (id) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/transaction/${id}/export`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `transaction-${id}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ getTransactions, exportTransaction, isLoading }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionContext, TransactionProvider };
