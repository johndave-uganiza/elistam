import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Products from "../pages/products/Products";
import { ProductProvider } from "../context/ProductContext";
import { OrderProvider } from "../context/OrderContext";
import Items from "../pages/items/Items";
import Transactions from "../pages/transactions/Transactions";
import { ItemProvider } from "../context/ItemContext";
import { TransactionProvider } from "../context/TransactionContext";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <TransactionProvider>
              <ItemProvider>
                <Dashboard />
              </ItemProvider>
            </TransactionProvider>
          </ProtectedRoute>
        }
      />

      <Route
        path="/items"
        element={
          <ProtectedRoute>
            <ItemProvider>
              <Items />
            </ItemProvider>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProductProvider>
            <OrderProvider>
              <Products />
            </OrderProvider>
          </ProductProvider>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <TransactionProvider>
              <Transactions />
            </TransactionProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
