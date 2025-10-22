import { useGetAllItemsCartByUser } from "@/hooks/cart/useGet/useGetAllCartByUser";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { ItemCartCard } from "./cart-item-card-drawer";

export const CartDrawerBody = () => {
  const { data: itemsCartResultByUser } = useGetAllItemsCartByUser();
  return (
    <div className="flex-col overflow-y-auto px-4">
      {itemsCartResultByUser?.data.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
          <Button variant="outline">Continue comprando</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {itemsCartResultByUser?.data.map((item: any) => (
            <ItemCartCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
