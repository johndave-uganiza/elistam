import { createContext, useEffect, useState } from "react";

const ItemContext = createContext(null);

// const BASE_URL = "";
// const jwtToken = "";

function ItemProvider({ children }) {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || [],
  );

  function fetchProducts() {
    fetch("https://dummyjson.com/products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // Save items to local storage only if data doesn't exist locally
        if (!JSON.parse(localStorage.getItem("items"))) {
          const result = res.products.map((item) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            quantity: item.stock,
            image: item.thumbnail,
          }));
          setItems(result);
          localStorage.setItem("items", JSON.stringify(result));
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
  //       // Save items to local storage only if data doesn't exist locally
  //       if (!JSON.parse(localStorage.getItem("items"))) {
  //         setItems(res.data);
  //         localStorage.setItem("items", JSON.stringify(res.data));
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
}

export { ItemContext, ItemProvider };
