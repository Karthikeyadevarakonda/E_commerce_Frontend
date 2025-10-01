import { createContext, useContext, useState, useEffect } from "react";

// 1️⃣ Create context
const CartContext = createContext();

// 2️⃣ Custom hook for easier usage
export const useCart = () => useContext(CartContext);

// 3️⃣ Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size) => {
    if (!size) return;

    const existing = cart.find(
      (item) => item.id === product.id && item.size === size
    );

    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, size, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  const decreaseQuantity = (productId, size) => {
    const item = cart.find(
      (item) => item.id === productId && item.size === size
    );
    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(productId, size);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
