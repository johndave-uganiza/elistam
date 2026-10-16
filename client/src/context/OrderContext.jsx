import { createContext, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";

const OrderContext = createContext(null);

function OrderProvider({ children }) {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (orderDetail) => {
    setIsLoading(true);
    const { itemId, name, description, price, quantity, image } = orderDetail;

    try {
      const payload = {
        date: null,
        orderDetails: [
          {
            itemId: itemId,
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            image: image,
          },
        ],
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

  const addOrderDetail = async (orderId, orderDetail) => {
    setIsLoading(true);
    const { itemId, name, description, price, quantity, image } = orderDetail;

    try {
      const payload = {
        itemId: itemId,
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        image: image,
      };

      const response = await fetch(
        `${API_BASE_URL}/api/order/${orderId}/details`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      return await response.json();
    } catch (error) {
      console.error("An error occurred while creating the order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrder = async (id, order) => {
    setIsLoading(true);

    try {
      const payload = JSON.stringify(order);
      const response = await fetch(`${API_BASE_URL}/api/order/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: payload,
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmOrder = async (id, paymentMethod) => {
    setIsLoading(true);

    try {
      const payload = JSON.stringify(paymentMethod);
      const response = await fetch(`${API_BASE_URL}/api/order/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: payload,
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrder = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/order`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        getOrder,
        createOrder,
        isLoading,
        confirmOrder,
        updateOrder,
        addOrderDetail,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProvider };
