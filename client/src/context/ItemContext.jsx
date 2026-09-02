import { createContext, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";

const ItemContext = createContext(null);

function ItemProvider({ children }) {
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/item`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        const items = result.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }));

        setItems(items);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const createItem = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Item`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      return await response.json();
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/item/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedItem,
      });

      return await response.json();
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/item/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return await response.json();
    } catch (error) {
      console.error("DELETE error:", error);
    }
  };

  return (
    <ItemContext.Provider
      value={{ items, createItem, getItems, updateItem, deleteItem }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export { ItemContext, ItemProvider };
