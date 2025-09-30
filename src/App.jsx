import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProductPage from "./pages/products/ProductPage.jsx";
import EachProduct from "./pages/products/EachProduct.jsx";
import { CartProvider } from "./utils/CartContext.jsx";
import CartComponent from "./pages/products/CartComponent.jsx";

const App = () => {
  return (
    <CartProvider>
      <Router>
        {/* Toaster for toast notifications */}
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<EachProduct />} />
          <Route path="/cart" element={<CartComponent />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
