"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { LocationInfo } from "@/data/locations";
import { BookingModal } from "@/components/BookingModal";

type BookingModalContextValue = {
  openBookingModal: (location: LocationInfo) => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [activeLocation, setActiveLocation] = useState<LocationInfo | null>(null);

  const openBookingModal = useCallback((location: LocationInfo) => {
    setActiveLocation(location);
  }, []);

  const closeBookingModal = useCallback(() => setActiveLocation(null), []);

  return (
    <BookingModalContext.Provider value={{ openBookingModal }}>
      {children}
      {activeLocation ? (
        <BookingModal location={activeLocation} onClose={closeBookingModal} />
      ) : null}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return ctx;
}
