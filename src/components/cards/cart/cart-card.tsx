import { IItemCartDetailed } from "@/@types/cart/ICart";
import { useDeleteItemCart } from "@/hooks/cart/useDelete/useDeleteItemCart";
import { useUpdateQuantityItemCart } from "@/hooks/cart/useUpdate/useUpdateQuantityItemCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";

interface CartCardProps {
  item: IItemCartDetailed;
}

export const CartCard = ({ item }: CartCardProps) => {
  const { mutateAsync: deleteItemCart } = useDeleteItemCart(["items-cart"]);
  const {
    mutateAsync: updateQuantityItemCart,
    isPending: isPendingUpdateQuantityItemCart,
  } = useUpdateQuantityItemCart(["items-cart"]);

  const handleDeleteItem = async (id: string) => {
    await deleteItemCart(id);
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return await deleteItemCart(itemId);
    await updateQuantityItemCart({ itemId, quantity });
  };

  return (
    <div
      key={item.productId}
      className="flex items-center gap-4 p-4 border rounded-lg"
    >
      <div className="flex-1">
        <h3 className="font-medium line-clamp-1">{item.name}</h3>
        <p className="text-sm text-gray-500">
          R$ {item.price.toFixed(2)} reais
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={isPendingUpdateQuantityItemCart}
          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={isPendingUpdateQuantityItemCart}
          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>
      <div className="text-right">
        <p className="font-medium">
          R$ {(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="outline"
          size="sm"
          disabled={isPendingUpdateQuantityItemCart}
          className="text-red-600 hover:bg-red-50 mt-1"
          onClick={() => handleDeleteItem(item.id)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};
