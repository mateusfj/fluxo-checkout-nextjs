"use client";

import { useCartStore } from "@/stores/use-cart-store";
import { generateId } from "@/utils/functions/generateId";
import { formatToBRLMask } from "@/utils/functions/masks/moneyMask";
import { memo } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";

interface productCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const ProductCard = memo((product: productCardProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    const data = {
      id: generateId(),
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description,
      quantity: 1,
    };
    addItem(data);
  };

  return (
    <Card className="overflow-hidden transition rounded-none shadow-none border-none p-0 bg-transparent">
      <CardHeader className="flex justify-center p-6 bg-muted rounded-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-50 object-contain"
        />
      </CardHeader>
      <CardContent className="space-y-1 text-start p-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
          <p className="text-lg font-bold">{formatToBRLMask(product.price)}</p>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-start p-0">
        <Button className="rounded-full" onClick={handleAddToCart}>
          {"Adicionar ao carrinho"}
        </Button>
      </CardFooter>
    </Card>
  );
});

ProductCard.displayName = "ProductCard";
