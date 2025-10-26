import { IItemCartDetailed } from "@/@types/cart/ICart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/stores/use-cart-store";
import { formatToBRLMask } from "@/utils/functions/masks/moneyMask";
import { Minus, Plus, Trash2 } from "lucide-react";
import { memo, useCallback } from "react";

interface CartCardProps {
  item: IItemCartDetailed;
}

export const CartCard = memo(({ item }: CartCardProps) => {
  const { updateItemQuantity, removeItem } = useCartStore();

  const handleDeleteItem = useCallback(
    (id: string) => {
      removeItem(id);
    },
    [removeItem]
  );

  const handleUpdateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity < 1) return removeItem(itemId);
      updateItemQuantity(itemId, quantity);
    },
    [removeItem, updateItemQuantity]
  );

  return (
    <Card className="flex flex-row items-center gap-4 p-4">
      <div className="flex-1 flex items-center gap-4">
        <div>
          <h3 className="font-medium line-clamp-1">{item.name}</h3>
          <p className="text-sm text-gray-500">
            {formatToBRLMask(item.price)} reais
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>
      <div className="text-right">
        <p className="font-medium">
          {formatToBRLMask(item.price * item.quantity)}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:bg-red-50 mt-1"
          onClick={() => handleDeleteItem(item.id)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </Card>
  );
});

CartCard.displayName = "CartCard";
