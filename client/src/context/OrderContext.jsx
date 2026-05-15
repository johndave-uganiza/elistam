import { createContext, useState } from "react";

const OrderContext = createContext(null);

function OrderProvider({ children }) {
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("order")) || [],
  );

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProvider };
