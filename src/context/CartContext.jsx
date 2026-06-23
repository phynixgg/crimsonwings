"use client";

import { createContext, useContext, useEffect, useReducer, useState, useMemo } from "react";
import { lineId } from "@/lib/format";

const CartContext = createContext(null);

const STORAGE_KEY = "akahane_cart_v1";

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.items;

    case "ADD": {
      const { product, size, qty, customization } = action;
      const id = lineId(product.slug, size, customization);
      const existing = state.find((i) => i.id === id);
      if (existing) {
        return state.map((i) =>
          i.id === id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...state,
        {
          id,
          slug: product.slug,
          name: product.name,
          nameEn: product.nameEn,
          price: product.price,
          currency: product.currency,
          image: product.images?.[0] || "",
          size,
          qty,
          customization: customization || null,
        },
      ];
    }

    case "UPDATE_QTY":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i))
        .filter((i) => i.qty > 0);

    case "REMOVE":
      return state.filter((i) => i.id !== action.id);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount (guarded for SSR).
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after hydration so we don't clobber stored data).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items, hydrated]);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const currency = items[0]?.currency || "NT$";

    return {
      items,
      count,
      subtotal,
      currency,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: ({ product, size, qty = 1, customization = null }) => {
        dispatch({ type: "ADD", product, size, qty, customization });
        setIsOpen(true);
      },
      updateQty: (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
