"use client";

import { IItemCartDetailed } from "@/@types/cart/ICart";

import { useCartStore } from "@/stores/use-cart-store";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { CartCard } from "./cart-card";

export const CartList = () => {
  const { getUserCart } = useCartStore();

  const { push } = useRouter();

  const handleContinueShopping = () => {
    push("/");
  };

  if (getUserCart().length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={handleContinueShopping}
        >
          Continue comprando
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {getUserCart().map((item: IItemCartDetailed) => (
        <CartCard key={item.id} item={item} />
      ))}
    </div>
  );
};
