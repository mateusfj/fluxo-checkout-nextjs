"use client";

import { IItemCartDetailed } from "@/@types/cart/ICart";
import { useCartStore } from "@/stores/use-cart-store";
import { formatToBRLMask } from "@/utils/functions/masks/moneyMask";
import { LucideCreditCard, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { ItemSummaryCard } from "./item-summary-card";

interface SummaryCardProps {
  enabledButton?: boolean;
}

export const SummaryCard = memo(({ enabledButton }: SummaryCardProps) => {
  const { push } = useRouter();
  const { getUserCart, getTotalPrice } = useCartStore();

  const handleRedirectToCheckout = () => {
    push("/checkout");
  };

  return (
    <Card className="flex flex-col gap-5">
      <CardHeader>
        <h3 className="font-semibold flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" />
          Resumo do Pedido
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {getUserCart().map((item: IItemCartDetailed) => (
            <ItemSummaryCard item={item} key={item.id} />
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatToBRLMask(getTotalPrice())}</span>
          </div>
        </div>
        {enabledButton && (
          <Button className="w-full" onClick={handleRedirectToCheckout}>
            <LucideCreditCard />
            Comprar agora
          </Button>
        )}
      </CardContent>
    </Card>
  );
});

SummaryCard.displayName = "SummaryCard";
