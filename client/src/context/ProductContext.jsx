import { createContext, useState } from "react";
import { API_BASE_URL } from "../config/api";

const ProductContext = createContext(null);

function ProductProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/product`, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{ getProducts, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
