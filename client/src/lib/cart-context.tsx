import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Mod, CartItemWithMod } from "@shared/schema";

type CartContextType = {
  items: CartItemWithMod[];
  addToCart: (mod: Mod) => void;
  removeFromCart: (modId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  sessionId: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemWithMod[]>([]);
  const [sessionId] = useState<string>(() => {
    const stored = localStorage.getItem('modstore-session');
    if (stored) return stored;
    const newId = generateSessionId();
    localStorage.setItem('modstore-session', newId);
    return newId;
  });

  useEffect(() => {
    const stored = localStorage.getItem('modstore-cart');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('modstore-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((mod: Mod) => {
    setItems(prev => {
      const exists = prev.find(item => item.modId === mod.id);
      if (exists) {
        return prev.map(item => 
          item.modId === mod.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, {
        id: 'cart_' + Math.random().toString(36).substring(2),
        sessionId,
        modId: mod.id,
        quantity: 1,
        mod
      }];
    });
  }, [sessionId]);

  const removeFromCart = useCallback((modId: string) => {
    setItems(prev => prev.filter(item => item.modId !== modId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + (item.mod.price * (item.quantity || 1)), 0);
  }, [items]);

  const getItemCount = useCallback(() => {
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [items]);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getTotal, 
      getItemCount,
      sessionId 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
