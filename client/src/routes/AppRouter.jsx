import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import BasketItems from "../pages/basket/BasketItems";
import ProductList from "../pages/products/ProductList";
import { ProductsProvider } from "../context/ProductsContext";
import { BasketProvider } from "../context/BasketContext";
import AddToBasket from "../pages/basket/AddToBasket";
import Transactions from "../pages/transactions/Transactions";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          // <AuthPage>
          <Dashboard />
          // </AuthPage>
        }
      />

      <Route
        path="/products"
        element={
          <ProductsProvider>
            <BasketProvider>
              <ProductList />
            </BasketProvider>
          </ProductsProvider>
        }
      />

      <Route
        path="/add-to-basket"
        element={
          <BasketProvider>
            <AddToBasket />
          </BasketProvider>
        }
      />

      <Route
        path="/basket"
        element={
          <BasketProvider>
            <BasketItems />
          </BasketProvider>
        }
      />

      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default AppRouter;
