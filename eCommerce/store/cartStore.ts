import { CartItem } from "@/types/cartItem";
import { create } from "zustand";

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find(
        (i) =>
          i.name === item.name && i.size === item.size && i.color === item.color
      );

      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.name === item.name &&
            i.size === item.size &&
            i.color === item.color
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }

      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (name) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.name !== name),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
