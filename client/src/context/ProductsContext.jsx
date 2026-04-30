import { createContext, useEffect, useState } from "react";

const ProductsContext = createContext(null);

function ProductsProvider({ children }) {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || [],
  );

  function fetchProducts() {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Save products to local storage only if data doesn't exist locally
        if (!JSON.parse(localStorage.getItem("products"))) {
          setProducts(data.products);
          localStorage.setItem("products", JSON.stringify(data.products));
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsProvider };
