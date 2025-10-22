import { AuthContext } from "@/utils/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";

interface CreateCartItemInput {
  productId: string;
  price: number;
}

export const useCreateItemCart = (invalidateQuery: string[]) => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

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
        `http://localhost:3001/itemsCart?cartId=${cart.id}&productId=${input.productId}`
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
          productId: input.productId,
          quantity: 1,
        }),
      });

      if (!createItemRes.ok)
        throw new Error("Erro ao adicionar item ao carrinho");

      return;
    },

    onMutate() {
      const toastId = toast.loading("Adicionando item ao carrinho...");
      return { toastId };
    },

    onError(error: any, _, context) {
      toast.error(error?.message || "Erro inesperado");
      toast.dismiss(context?.toastId);
    },

    onSuccess(_, __, context) {
      toast.success("Item adicionado ao carrinho com sucesso!");
      toast.dismiss(context?.toastId);
    },

    onSettled(_, __, ___, context) {
      toast.dismiss(context?.toastId);
      queryClient.invalidateQueries({ queryKey: invalidateQuery });
    },
  });
};
