import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('salama_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('salama_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('salama_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('salama_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('salama_coupon');
      }
    } catch (e) {
      console.error('Failed to save coupon to localStorage:', e);
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1) => {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        addToast(`Updated ${product.name} quantity to ${updated[existingIndex].quantity}`, 'success');
        return updated;
      } else {
        addToast(`Added ${product.name} to cart!`, 'success');
        return [...prevItems, { product, quantity: qty }];
      }
    });
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cartItems.find((item) => item.product.id === productId);
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      addToast(`Removed ${itemToRemove.product.name} from cart`, 'info');
    }
  };

  const updateQuantity = (productId, quantity) => {
    const validQty = parseInt(quantity, 10);
    if (validQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: validQty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    addToast('Shopping cart cleared', 'info');
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return { success: false, message: 'Please enter a coupon code' };

    if (clean === 'SALAMA10' || clean === 'MEDICARE10') {
      const coupon = { code: 'SALAMA10', discountPercent: 10, label: '10% Off Pharmacy Order' };
      setAppliedCoupon(coupon);
      addToast('Coupon SALAMA10 applied! (10% OFF)', 'success');
      return { success: true, message: 'Coupon applied successfully!' };
    } else if (clean === 'SALAMA20' || clean === 'HEALTH20') {
      const coupon = { code: 'SALAMA20', discountPercent: 20, label: '20% Off Pharmacy Saver' };
      setAppliedCoupon(coupon);
      addToast('Coupon SALAMA20 applied! (20% OFF)', 'success');
      return { success: true, message: 'Coupon applied successfully!' };
    } else if (clean === 'FREESHIP') {
      const coupon = { code: 'FREESHIP', freeShipping: true, label: 'Free Express Shipping' };
      setAppliedCoupon(coupon);
      addToast('Coupon FREESHIP applied! (Free Delivery)', 'success');
      return { success: true, message: 'Free shipping coupon applied!' };
    } else {
      addToast('Invalid coupon code. Try SALAMA10 or SALAMA20', 'error');
      return { success: false, message: 'Invalid or expired coupon code' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedCoupon?.discountPercent
    ? (subtotal * appliedCoupon.discountPercent) / 100
    : 0;

  // Free shipping threshold in Egypt: 350 EGP
  const isFreeShipping = subtotal >= 350 || appliedCoupon?.freeShipping;
  const shippingFee = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : 30; // 30 EGP flat delivery fee
  const taxFee = 0; // Medicine retail prices in Egypt are net and tax-inclusive
  const total = Math.max(0, subtotal - discountAmount + shippingFee + taxFee);
  const totalItemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shippingFee,
        isFreeShipping,
        taxFee,
        total,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
