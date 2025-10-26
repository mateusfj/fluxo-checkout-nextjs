"use client";

import { IItemCartDetailed } from "@/@types/cart/ICart";
import { useCartStore } from "@/stores/use-cart-store";
import { CartCard } from "./cart-card";

export const CartList = () => {
  const { getUserCart } = useCartStore();

  return (
    <div className="space-y-4">
      {getUserCart().map((item: IItemCartDetailed) => (
        <CartCard key={item.id} item={item} />
      ))}
    </div>
  );
};
