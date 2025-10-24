import { CartStore } from "@/@types/cart/ICartStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartsByUser: {},
      userId: "",

      setUserId: (userId) => set({ userId }),

      getUserCart() {
        const { cartsByUser, userId } = get();
        return cartsByUser[userId] || [];
      },

      addItem: (item) =>
        set((state) => {
          const { userId, cartsByUser } = state;
          if (!userId) return state;

          const userCart = cartsByUser[userId] || [];
          const existingItemIndex = userCart.findIndex(
            (cartItem) => cartItem.productId === item.productId
          );

          let updatedCart;
          if (existingItemIndex >= 0) {
            updatedCart = [...userCart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: updatedCart[existingItemIndex].quantity + 1,
            };
          } else {
            updatedCart = [...userCart, { ...item, quantity: 1 }];
          }

          return {
            cartsByUser: {
              ...cartsByUser,
              [userId]: updatedCart,
            },
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const { userId, cartsByUser } = state;
          if (!userId) return state;

          const userCart = cartsByUser[userId] || [];
          const updatedCart = userCart.filter((item) => item.id !== id);

          return {
            cartsByUser: {
              ...cartsByUser,
              [userId]: updatedCart,
            },
          };
        }),

      updateItemQuantity: (id, quantity) =>
        set((state) => {
          const { userId, cartsByUser } = state;
          if (!userId) return state;

          const userCart = cartsByUser[userId] || [];
          const updatedCart = userCart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );

          return {
            cartsByUser: {
              ...cartsByUser,
              [userId]: updatedCart,
            },
          };
        }),

      getCartItems: () => get().getUserCart(),

      getTotalItems: () => get().getUserCart().length,

      getTotalPrice: () =>
        get()
          .getUserCart()
          .reduce((total, item) => total + item.price * item.quantity, 0),

      clearCart: () =>
        set((state) => {
          const { userId, cartsByUser } = state;
          if (!userId) return state;

          return {
            cartsByUser: {
              ...cartsByUser,
              [userId]: [],
            },
          };
        }),
    }),
    {
      name: "multi-user-cart-storage",
    }
  )
);
