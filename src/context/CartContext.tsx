/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartShipping: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  freeShippingTarget: number;
  freeShippingProgress: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  discountPercentage: number;
  discountAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("amlora_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
  }, []);

  // Save cart to localStorage when changed
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("amlora_cart", JSON.stringify(items));
  };

  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cartItems.findIndex((item) => item.product.id === product.id);
    let newItems = [...cartItems];

    if (existingIndex > -1) {
      newItems[existingIndex].quantity += quantity;
    } else {
      newItems.push({ product, quantity });
    }
    saveCart(newItems);
    setIsCartOpen(true); // Open the cart dynamically so they see the result immediately
  };

  const removeFromCart = (productId: string) => {
    const newItems = cartItems.filter((item) => item.product.id !== productId);
    saveCart(newItems);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(newItems);
  };

  const clearCart = () => {
    saveCart([]);
    setPromoCode("");
    setDiscountPercentage(0);
  };

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === "AMLA10") {
      setPromoCode("AMLA10");
      setDiscountPercentage(10);
      return true;
    } else if (cleanCode === "PUREHERITAGE") {
      setPromoCode("PUREHERITAGE");
      setDiscountPercentage(15);
      return true;
    }
    return false;
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Free shipping target is ₹500
  const freeShippingTarget = 500;
  const freeShippingProgress = Math.min((cartSubtotal / freeShippingTarget) * 100, 100);

  const discountAmount = Math.round((cartSubtotal * discountPercentage) / 100);
  const discountedSubtotal = cartSubtotal - discountAmount;

  // Shipping is ₹50, FREE above ₹500
  const cartShipping = cartSubtotal === 0 ? 0 : cartSubtotal >= freeShippingTarget ? 0 : 50;

  // GST tax is 5% in India on packaged health foods, included in price normally, but shown as breakdowns
  const cartTax = Math.round(discountedSubtotal * 0.05);

  const cartTotal = discountedSubtotal + cartShipping;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTax,
        cartShipping,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        freeShippingTarget,
        freeShippingProgress,
        promoCode,
        applyPromoCode,
        discountPercentage,
        discountAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
