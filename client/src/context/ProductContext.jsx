import { createContext, useEffect, useState } from "react";

const ProductContext = createContext(null);

// const BASE_URL = "";
// const jwtToken = "";

function ProductProvider({ children }) {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || [],
  );

  function fetchProducts() {
    fetch("https://dummyjson.com/products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // Save products to local storage only if data doesn't exist locally
        if (!JSON.parse(localStorage.getItem("products"))) {
          const result = res.products.map((item) => ({
            name: item.title,
            price: item.price,
            quantity: item.stock,
            image: item.thumbnail,
          }));
          setProducts(result);
          localStorage.setItem("products", JSON.stringify(result));
        }
      })
      .catch((error) => console.error(error));
  }

  // function fetchProducts() {
  //   fetch(`${BASE_URL}api/Item`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       // Save products to local storage only if data doesn't exist locally
  //       if (!JSON.parse(localStorage.getItem("products"))) {
  //         setProducts(res.data);
  //         localStorage.setItem("products", JSON.stringify(res.data));
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
