import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";

const OrderContext = createContext(null);

function OrderProvider({ children }) {
  const token = localStorage.getItem("token");
  // const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (formData) => {
    setIsLoading(true);
    const { id, name, description, price, quantity, image } =
      formData.orderDetail;

    try {
      const payload = {
        date: formData.date,
        orderDetail: {
          productId: id,
          name: name,
          description: description,
          price: price,
          quantity: quantity,
          image: image,
        },
      };

      const response = await fetch(`${API_BASE_URL}/api/order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          // Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      return await response.json();
    } catch (error) {
      console.error("An error occurred while creating the order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  const getOrder = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/order`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  //   getOrder();
  // }, []);

  return (
    <OrderContext.Provider value={{ getOrder, createOrder, isLoading }}>
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProvider };
