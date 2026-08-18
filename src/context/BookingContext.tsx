import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { BookingData, CartItem } from "@/types";

interface BookingContextValue {
  open: boolean;
  step: number;
  data: BookingData;
  bookingId: string | null;
  openDrawer: (initial?: Partial<BookingData>) => void;
  closeDrawer: () => void;
  next: () => void;
  prev: () => void;
  setStep: (s: number) => void;
  setData: (patch: Partial<BookingData>) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  reset: () => void;
  confirm: () => string;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setDataState] = useState<BookingData>({ cart: [] });
  const [bookingId, setBookingId] = useState<string | null>(null);

  const setData = useCallback(
    (patch: Partial<BookingData>) => setDataState((d) => ({ ...d, ...patch })),
    [],
  );

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setDataState((prev) => {
      const cart = prev.cart || [];
      const existing = cart.find((c) => c.id === item.id);
      if (existing) {
        return {
          ...prev,
          cart: cart.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)),
        };
      }
      return { ...prev, cart: [...cart, { ...item, quantity: 1 }] };
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setDataState((prev) => ({
      ...prev,
      cart: (prev.cart || []).filter((c) => c.id !== id),
    }));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setDataState((prev) => {
      const cart = prev.cart || [];
      return {
        ...prev,
        cart: cart
          .map((c) => {
            if (c.id === id) {
              const newQty = c.quantity + delta;
              return newQty > 0 ? { ...c, quantity: newQty } : c;
            }
            return c;
          })
          .filter((c) => c.quantity > 0),
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setDataState((prev) => ({ ...prev, cart: [] }));
  }, []);

  const openDrawer = useCallback((initial?: Partial<BookingData>) => {
    if (initial) setDataState((d) => ({ ...d, ...initial }));
    setStep(0);
    setBookingId(null);
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setStep((s) => Math.min(s + 1, 5)), []);
  const prev = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  const reset = useCallback(() => {
    setDataState({ cart: [] });
    setStep(0);
    setBookingId(null);
  }, []);

  const confirm = useCallback(() => {
    const id = `CC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(id);
    setStep(5);
    return id;
  }, []);

  const value = useMemo(
    () => ({
      open,
      step,
      data,
      bookingId,
      openDrawer,
      closeDrawer,
      next,
      prev,
      setStep,
      setData,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      reset,
      confirm,
    }),
    [
      open,
      step,
      data,
      bookingId,
      openDrawer,
      closeDrawer,
      next,
      prev,
      setStep,
      setData,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      reset,
      confirm,
    ],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
