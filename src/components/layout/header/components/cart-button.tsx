"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCartStore } from "@/stores/use-cart-store";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const CartButton = () => {
  const { push } = useRouter();
  const { getTotalItems } = useCartStore();

  const handleNavigateToCart = () => {
    push("/cart");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="relative"
          onClick={handleNavigateToCart}
        >
          <ShoppingCart className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full text-[10px] text-white">
            {getTotalItems()}
          </Badge>
          <p className="hidden md:block"> Carrinho</p>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Ir para o carrinho</p>
      </TooltipContent>
    </Tooltip>
  );
};

export { CartButton };
