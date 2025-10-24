import { useCartStore } from "@/stores/use-cart-store";
import { generateId } from "@/utils/functions/generateId";
import { AuthContext } from "@/utils/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";

interface ProductData {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface CreateCartItemInput {
  product: ProductData;
}

export const useCreateItemCart = (invalidateQuery: string[]) => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { addItem, removeItem, updateItemId } = useCartStore();

  return useMutation({
    mutationFn: async (input: CreateCartItemInput) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) throw new Error("Usuário não autenticado");

      const cartRes = await fetch(
        `http://localhost:3001/cart?userId=${user.id}`
      );

      if (!cartRes.ok) throw new Error("Erro ao buscar o carrinho do usuário");

      const carts = await cartRes.json();
      let cart = carts[0];

      if (!cart) {
        const newCartRes = await fetch(`http://localhost:3001/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!newCartRes.ok) throw new Error("Erro ao criar novo carrinho");

        cart = await newCartRes.json();
      }

      const itemRes = await fetch(
        `http://localhost:3001/itemsCart?cartId=${cart.id}&productId=${input.product.id}`
      );

      if (!itemRes.ok) throw new Error("Erro ao buscar item no carrinho");

      const items = await itemRes.json();
      const existingItem = items[0];

      if (existingItem) {
        const updateRes = await fetch(
          `http://localhost:3001/itemsCart/${existingItem.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
          }
        );

        if (!updateRes.ok)
          throw new Error("Erro ao atualizar quantidade do item");
        return;
      }

      const createItemRes = await fetch(`http://localhost:3001/itemsCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cart.id,
          productId: input.product.id,
          quantity: 1,
        }),
      });

      if (!createItemRes.ok)
        throw new Error("Erro ao adicionar item ao carrinho");

      const createdItem = await createItemRes.json();

      return createdItem;
    },

    onMutate(data) {
      const tempId = generateId();
      addItem({
        id: tempId,
        productId: data.product.id,
        description: data.product.description,
        name: data.product.name,
        price: data.product.price,
        imageUrl: data.product.imageUrl,
        quantity: 1,
      });
      return { tempId };
    },

    onError(error: any, __, context: any) {
      toast.error(error?.message || "Erro inesperado");
      if (context?.tempId) removeItem(context.tempId);
    },

    onSuccess(data, __, context) {
      if (context?.tempId && data?.id) {
        updateItemId(context.tempId, data.id);
      }
      toast.success("Item adicionado ao carrinho com sucesso!", {
        id: "success-add",
      });
    },

    onSettled(_, __, ___, context) {
      queryClient.invalidateQueries({ queryKey: invalidateQuery });
    },
  });
};
