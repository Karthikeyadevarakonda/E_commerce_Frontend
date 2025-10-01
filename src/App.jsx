import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProductPage from "./pages/products/ProductPage.jsx";
import EachProduct from "./pages/products/EachProduct.jsx";
import { CartProvider } from "./utils/CartContext.jsx";
import CartComponent from "./pages/products/CartComponent.jsx";
import { AddressProvider } from "./utils/AddressContext.jsx";
import { PaymentProvider } from "./utils/PaymentContext.jsx";
import Page from "./pages/admin/addProduct/Page.jsx";
import Metrics from "./pages/admin/dashboard/Metrics.jsx";
import MetricsPage from "./pages/admin/MetricPage.jsx";
import AddProductPage from "./pages/admin/AddProductPage.jsx";

const App = () => {
  return (
    <CartProvider>
      <AddressProvider>
        <PaymentProvider>
          <Router>
            <Toaster position="top-right" reverseOrder={false} />

            <Routes>
              <Route index element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/product/:id" element={<EachProduct />} />
              <Route path="/cart" element={<CartComponent />} />
              <Route path="/admin/metrics" element={<MetricsPage />} />

              <Route path="/admin/products" element={<AddProductPage />} />
            </Routes>
          </Router>
        </PaymentProvider>
      </AddressProvider>
    </CartProvider>
  );
};

export default App;
