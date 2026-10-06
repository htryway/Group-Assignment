import React, { createContext, useContext, useState, ReactNode } from "react";
import { Customer, Totals, BookingDetails } from "../types";

interface BookingContextValue {
  customer: Customer | null;
  setCustomer: (c: Customer) => void;
  totals: Totals | null;
  setTotals: (t: Totals) => void;
  bookingDetails: BookingDetails | null;
  setBookingDetails: (b: BookingDetails) => void;
}

// Expo Router only carries plain strings through route params (they're just
// URL segments/query values under the hood), so the objects this flow needs
// to hand between screens — the customer's details and the calculated totals
// — live here instead of being passed via navigate() the way the original
// React Navigation version did.
const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  return (
    <BookingContext.Provider
      value={{ customer, setCustomer, totals, setTotals, bookingDetails, setBookingDetails }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
