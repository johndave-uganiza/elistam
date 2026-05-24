import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Orders from "../pages/orders/Orders";
import ProductList from "../pages/products/ProductList";
import { ProductProvider } from "../context/ProductContext";
import { OrderProvider } from "../context/OrderContext";
import AddToOrder from "../pages/orders/AddToOrder";
import Items from "../pages/items/Items";
import Transactions from "../pages/transactions/Transactions";
import { ItemProvider } from "../context/ItemContext";
import { TransactionProvider } from "../context/TransactionContext";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          // <AuthPage>
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          // </AuthPage>
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
              <ProductList />
            </OrderProvider>
          </ProductProvider>
        }
      />

      <Route
        path="/add-to-orders"
        element={
          <ProtectedRoute>
            <OrderProvider>
              <AddToOrder />
            </OrderProvider>
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderProvider>
              <TransactionProvider>
                <Orders />
              </TransactionProvider>
            </OrderProvider>
          </ProtectedRoute>
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
