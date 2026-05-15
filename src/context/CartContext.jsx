import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../services/CartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // Load real count from API on mount
  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const res = await getCart();
      const items = res.data ?? [];
      // Sum quantities if each item has a quantity field, else just count items
      const total = items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
      setCartCount(total);
    } catch (err) {
      console.error("Failed to load cart count:", err);
    }
  };

  // Call this after addToCart succeeds — increments badge by qty added (default 1)
  const incrementCart = (qty = 1) => setCartCount(prev => prev + qty);

  // Call this after deleteCart succeeds — decrements by qty removed (default 1)
  const decrementCart = (qty = 1) => setCartCount(prev => Math.max(0, prev - qty));

  // Call this to fully re-sync from API (e.g. after checkout)
  const refreshCart = () => fetchCount();

  return (
    <CartContext.Provider value={{ cartCount, incrementCart, decrementCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}