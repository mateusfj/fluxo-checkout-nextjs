import { useCreateItemCart } from "@/hooks/cart/useCreate/useCreateItemCart";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface productCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export const ProductCard = (product: productCardProps) => {
  const { mutateAsync: createItemCart } = useCreateItemCart(["items-cart"]);

  const handleAddToCart = async () => {
    await createItemCart({ productId: product.id, price: product.price });
  };

  return (
    <Card
      key={product.id}
      className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition"
    >
      <button className="absolute right-3 top-3 text-gray-400 hover:text-red-500">
        <Heart size={20} />
      </button>
      <CardHeader className="flex justify-center p-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-32 object-contain"
        />
      </CardHeader>
      <CardContent className="space-y-1 text-center">
        <h3 className="font-semibold text-sm">{product.name}</h3>
        <p className="text-xs text-gray-500">{product.description}</p>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Quantidade: {product.quantity}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="w-full" onClick={handleAddToCart}>
          Adicionar ao carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};
