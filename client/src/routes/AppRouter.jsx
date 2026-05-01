import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/login/LoginPage";
import BasketPage from "../pages/basket/BasketPage";
import ProductsPage from "../pages/products/ProductsPage";
import { ProductsProvider } from "../context/ProductsContext";
import { BasketProvider } from "../context/BasketContext";
import AddToBasketPage from "../pages/add-to-basket/AddToBasketPage";
import TransactionsPage from "../pages/transactions/TransactionsPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          // <AuthPage>
          <DashboardPage />
          // </AuthPage>
        }
      />

      <Route
        path="/products"
        element={
          <ProductsProvider>
            <BasketProvider>
              <ProductsPage />
            </BasketProvider>
          </ProductsProvider>
        }
      />

      <Route
        path="/add-to-basket"
        element={
          <BasketProvider>
            <AddToBasketPage />
          </BasketProvider>
        }
      />

      <Route
        path="/basket"
        element={
          <BasketProvider>
            <BasketPage />
          </BasketProvider>
        }
      />

      <Route path="/transactions" element={<TransactionsPage />} />
    </Routes>
  );
}

export default AppRouter;
