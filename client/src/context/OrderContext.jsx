import { createContext, useState } from "react";

const OrderContext = createContext(null);

function OrderProvider({ children }) {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("order")) || [],
  );

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProvider };
