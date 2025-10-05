import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EachProduct from "./pages/products/EachProduct";
import CartComponent from "./pages/products/CartComponent";
import MetricsPage from "./pages/admin/MetricPage";
import AddProductPage from "./pages/admin/AddProductPage";
import GuestRoute from "./utils/GuestRoute";
import { CartProvider } from "./utils/CartContext";
import { AddressProvider } from "./utils/AddressContext";
import { PaymentProvider } from "./utils/PaymentContext";
import ProductsPage from "./pages/products/ProductPage";
import Profile from "./pages/Profile";
import AdminOrders from "./pages/admin/AdminOrders";

const App = () => {
  return (
    <CartProvider>
      <AddressProvider>
        <PaymentProvider>
          <AuthProvider>
            {/* ✅ Keep Toaster OUTSIDE Router */}
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 2500,
                style: {
                  zIndex: 9999,
                },
              }}
            />

            <Router>
              <Routes>
                <Route index element={<LandingPage />} />

                <Route
                  path="/login"
                  element={
                    <GuestRoute>
                      <LoginPage />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <GuestRoute>
                      <RegisterPage />
                    </GuestRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute roles={["USER", "ADMIN"]}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* User Protected */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<EachProduct />} />
                <Route path="/cart" element={<CartComponent />} />

                {/* Admin Only */}
                <Route
                  path="/admin/metrics"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <MetricsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <AddProductPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <AdminOrders />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </AuthProvider>
        </PaymentProvider>
      </AddressProvider>
    </CartProvider>
  );
};

export default App;
