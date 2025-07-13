import { Product } from "@/types/product";
import { create } from "zustand";

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;

  favoritesByUserId: Record<string, Set<string>>;
  toggleFavorite: (userId: string, productId: string) => void;
  isFavorite: (userId: string, productId: string) => boolean;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),

  favoritesByUserId: {},

  toggleFavorite: (userId, productId) => {
    const current = get().favoritesByUserId[userId] ?? new Set();
    const newSet = new Set(current);
    if (newSet.has(productId)) {
      newSet.delete(productId);
    } else {
      newSet.add(productId);
    }

    set((state) => ({
      favoritesByUserId: {
        ...state.favoritesByUserId,
        [userId]: newSet,
      },
    }));
  },

  isFavorite: (userId, productId) => {
    return get().favoritesByUserId[userId]?.has(productId) ?? false;
  },
}));
