import { IResponseError } from "@/@types/services/IResponse";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteItemCart = (invalidateQuery: string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const itemRes = await fetch(`http://localhost:3001/itemsCart/${id}`);

      if (!itemRes.ok) {
        throw new Error("Erro ao buscar item no carrinho");
      }

      const deleteItemRes = await fetch(
        `http://localhost:3001/itemsCart/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteItemRes.ok) {
        const data: IResponseError = await deleteItemRes.json();
        throw data;
      }

      return;
    },
    onError: async (error: IResponseError) => {
      toast.error(error.message || "Erro inesperado");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: invalidateQuery }),
    onSuccess: () => {
      toast.success("Item removido do carrinho com sucesso!", {
        id: "success-delete",
      });
    },
  });
};

export { useDeleteItemCart };
