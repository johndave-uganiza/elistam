import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Orders from "../pages/orders/Orders";
import ProductList from "../pages/products/ProductList";
import { ProductsProvider } from "../context/ProductsContext";
import { BasketProvider } from "../context/BasketContext";
import AddToOrder from "../pages/orders/AddToOrder";
import Items from "../pages/items/Items";
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
        path="/items"
        element={
          <ProductsProvider>
            <BasketProvider>
              <Items />
            </BasketProvider>
          </ProductsProvider>
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
        path="/add-to-order"
        element={
          <BasketProvider>
            <AddToOrder />
          </BasketProvider>
        }
      />

      <Route
        path="/orders"
        element={
          <BasketProvider>
            <Orders />
          </BasketProvider>
        }
      />

      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default AppRouter;
