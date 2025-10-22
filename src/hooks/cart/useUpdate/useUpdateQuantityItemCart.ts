import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface useUpdateQuantityItemCartProps {
  itemId: string;
  quantity: number;
}

export const useUpdateQuantityItemCart = (invalidateQuery: string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: useUpdateQuantityItemCartProps) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const itemRes = await fetch(
        `http://localhost:3001/itemsCart/${input.itemId}`
      );

      if (!itemRes.ok) {
        throw new Error("Erro ao buscar item no carrinho");
      }

      const res = await fetch(
        `http://localhost:3001/itemsCart/${input.itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: input.quantity }),
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao atualizar quantidade do item");
      }

      return Promise.resolve();
    },
    onError: (error) => {
      toast.error(error.message || "Erro inesperado");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }),
  });
};
