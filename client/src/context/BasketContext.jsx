import { createContext, useState } from "react";

const BasketContext = createContext(null);

function BasketProvider({ children }) {
  const [basketItems, setBasketItems] = useState(
    JSON.parse(localStorage.getItem("basket")) || [],
  );

  return (
    <BasketContext.Provider value={{ basketItems, setBasketItems }}>
      {children}
    </BasketContext.Provider>
  );
}

export { BasketContext, BasketProvider };
