import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";

const OrderContext = createContext(null);

function OrderProvider({ children }) {
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState([]);

  const createOrder = async (product) => {
    try {
      const payload = {
        date: null,
        orderDetail: {
          productId: product.id,
          name: product.name,
          description: "",
          price: product.price,
          quantity: product.quantity,
          image: product.image,
        },
      };

      const response = await fetch(`${API_BASE_URL}/api/order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("result", result);
    } catch (error) {
      console.error("An error occurred while creating the order:", error);
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/order`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setOrder(result.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ order, setOrder, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProvider };
