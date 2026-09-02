import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../utilities/constants";

const ProductContext = createContext(null);

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/product`, {
          method: "GET",
        });

        const result = await response.json();
        const products = result.data.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          image: product.image,
        }));

        setProducts(products);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
