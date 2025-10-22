import { IItemCart, IItemCartDetailed } from "@/@types/cart/ICart";
import { IResponseList } from "@/@types/services/IResponse";
import { AuthContext } from "@/utils/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export const useGetAllItemsCartByUser = () => {
  const { user } = useContext(AuthContext);

  return useQuery({
    enabled: !!user?.id,
    queryKey: ["items-cart"],
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<IResponseList<IItemCartDetailed>> => {
      if (!user?.id) throw new Error("Usuário não autenticado");

      const cartRes = await fetch(
        `http://localhost:3001/cart?userId=${user.id}`
      );

      if (!cartRes.ok) throw new Error("Erro ao buscar o carrinho");

      const carts = await cartRes.json();

      const cart = carts[0];

      if (!cart) return { data: [] };

      const itemsRes = await fetch(
        `http://localhost:3001/itemsCart?cartId=${cart.id}`
      );

      if (!itemsRes.ok) throw new Error("Erro ao buscar items do carrinho");

      const items: IItemCart[] = await itemsRes.json();

      const productsRes = await fetch("http://localhost:3001/products");

      if (!productsRes.ok) throw new Error("Erro ao buscar produtos");

      const products: IProduct[] = await productsRes.json();

      const detailed: IItemCartDetailed[] = items.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        return {
          ...item,
          product,
          subtotal: product.price * item.quantity,
        };
      });

      return { data: detailed };
    },
  });
};
