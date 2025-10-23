import { useGetAllItemsCartByUser } from "@/hooks/cart/useGet/useGetAllCartByUser";
import { ShoppingBag } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

export const CheckoutSummaryCard = () => {
  const { data: cartItemsResult } = useGetAllItemsCartByUser();

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
          {cartItemsResult?.data.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded-md"
                />
                <Badge className="absolute -top-1 -right-1 text-xs min-w-5 h-5 flex items-center justify-center">
                  {item.quantity}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {item.product.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    ${item.product.price}
                  </span>
                  {item.product.price && (
                    <span className="text-xs text-muted-foreground line-through">
                      ${item.product.price}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${100}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
