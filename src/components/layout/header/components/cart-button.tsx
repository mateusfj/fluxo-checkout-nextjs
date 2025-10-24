"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/use-cart-store";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const CartButton = () => {
  const { push } = useRouter();
  const { items } = useCartStore();

  const handleNavigateToCart = () => {
    push("/cart");
  };

  return (
    <Button variant="ghost" className="relative" onClick={handleNavigateToCart}>
      <ShoppingCart className="h-5 w-5" />
      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full text-[10px] text-white">
        {items.length}
      </Badge>
      Carrinho
    </Button>
  );
};

export { CartButton };
