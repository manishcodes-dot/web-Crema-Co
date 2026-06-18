import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = useCallback((product, options = {}) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item._id === product._id && item.size === (options.size || 'medium')
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, {
        ...product,
        quantity: 1,
        size: options.size || 'medium',
        milkOption: options.milkOption || 'whole'
      }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item._id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item._id !== id));
      return;
    }
    setItems(prev => prev.map(item =>
      item._id === id ? { ...item, quantity } : item
    ));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      subtotal, tax, total, itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
