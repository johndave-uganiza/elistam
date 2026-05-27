import { createContext, useState } from "react";

const TransactionContext = createContext(null);

function TransactionProvider({ children }) {
  const [transactionCtx, setTransactionCtx] = useState(
    JSON.parse(localStorage.getItem("transactions")) || [],
  );

  return (
    <TransactionContext.Provider value={{ transactionCtx, setTransactionCtx }}>
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionContext, TransactionProvider };
