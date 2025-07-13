import { CartItem } from "./cartItem";

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
  }