"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { LocationInfo } from "@/data/locations";
import { BookingModal } from "@/components/BookingModal";

type OpenBookingOptions = {
  /** Service name to pre-select in the form (must match a service for the location). */
  service?: string;
};

type BookingModalContextValue = {
  openBookingModal: (location: LocationInfo, options?: OpenBookingOptions) => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [activeLocation, setActiveLocation] = useState<LocationInfo | null>(null);
  const [presetService, setPresetService] = useState<string | undefined>(undefined);

  const openBookingModal = useCallback((location: LocationInfo, options?: OpenBookingOptions) => {
    setPresetService(options?.service);
    setActiveLocation(location);
  }, []);

  const closeBookingModal = useCallback(() => setActiveLocation(null), []);

  return (
    <BookingModalContext.Provider value={{ openBookingModal }}>
      {children}
      {activeLocation ? (
        <BookingModal location={activeLocation} presetService={presetService} onClose={closeBookingModal} />
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
