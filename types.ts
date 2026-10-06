export interface Item {
  id: string;
  name: string;
  price: number;
  badge: string;
  category?: string;
  summary: string;
  inclusions: string[];
}

export interface LineItem extends Item {
  qty: number;
  lineTotal: number;
}

export interface Totals {
  lineItems: LineItem[];
  totalBookings: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  afterDiscount: number;
  vat: number;
  grandTotal: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface BookingDetails {
  date: string;
  time: string;
  reference: string;
}
