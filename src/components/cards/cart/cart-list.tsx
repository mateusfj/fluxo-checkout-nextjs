"use client";

import { IItemCartDetailed } from "@/@types/cart/ICart";
import { useCartStore } from "@/stores/use-cart-store";
import { ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";
import { CartCard } from "./cart-card";

export const CartList = () => {
  const { items: cartItems } = useCartStore();

  return (
    <div className="flex-col">
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
          <Button variant="outline">Continue comprando</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item: IItemCartDetailed) => (
            <CartCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
