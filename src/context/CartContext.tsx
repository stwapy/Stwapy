'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing } from '@/lib/api';

export interface CartItem {
  id: string;
  listingId: string;
  title: string;
  price: number;
  image: string;
  condition: string;
  sellerId: string;
  sellerName: string;
  institutionName?: string;
  meetingArea: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (listing: Listing, quantity?: number) => void;
  removeFromCart: (listingId: string) => void;
  updateQuantity: (listingId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'stwapy_shopping_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to storage', e);
      }
    }
  }, [items, isLoaded]);

  const addToCart = (listing: Listing, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.listingId === listing.id);
      if (existing) {
        return prev.map((item) =>
          item.listingId === listing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const primaryImg =
        listing.images && listing.images.length > 0
          ? listing.images[0].url
          : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${listing.id}`,
        listingId: listing.id,
        title: listing.title,
        price: listing.price,
        image: primaryImg,
        condition: listing.condition,
        sellerId: listing.sellerId,
        sellerName: listing.sellerName,
        institutionName: listing.institutionName,
        meetingArea: listing.meetingArea,
        quantity,
      };

      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (listingId: string) => {
    setItems((prev) => prev.filter((item) => item.listingId !== listingId));
  };

  const updateQuantity = (listingId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(listingId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.listingId === listingId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
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
