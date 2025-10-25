"use client";

import { IItemCartDetailed } from "@/@types/cart/ICart";
import { useCartStore } from "@/stores/use-cart-store";
import { formatToBRLMask } from "@/utils/functions/masks/moneyMask";
import { ShoppingBag } from "lucide-react";
import { memo } from "react";
import { ItemSummaryCard } from "../cards/summary-card/item-summary-card";
import { Card, CardContent, CardHeader } from "../ui/card";

export const PaymentSummaryCard = memo(() => {
  const { getUserCart, getTotalPrice } = useCartStore();

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
      </CardContent>
    </Card>
  );
});

PaymentSummaryCard.displayName = "PaymentSummaryCard";
