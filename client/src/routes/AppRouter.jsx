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
          <ItemProvider>
            <Items />
          </ItemProvider>
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
          <OrderProvider>
            <AddToOrder />
          </OrderProvider>
        }
      />

      <Route
        path="/orders"
        element={
          <OrderProvider>
            <Orders />
          </OrderProvider>
        }
      />

      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default AppRouter;
