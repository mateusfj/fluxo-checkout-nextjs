import { IItemCartDetailed } from "@/@types/cart/ICart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: IItemCartDetailed[];
  addItem: (item: IItemCartDetailed) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  updateItemId: (tempId: string, realId: string) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,
                    }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateItemQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      updateItemId: (tempId, realId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === tempId ? { ...i, id: realId } : i
          ),
        })),

      getTotalPrice: () =>
        get().items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0),

      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" }
  )
);
