import { IItemCart, IItemCartDetailed } from "@/@types/cart/ICart";
import { IProduct } from "@/@types/products/IProduct";
import { IResponseList } from "@/@types/services/IResponse";
import { useCartStore } from "@/stores/use-cart-store";
import { useQuery } from "@tanstack/react-query";

interface useGetAllItemsCartByUserProps {
  userId: string;
}

export const useGetAllItemsCartByUser = ({
  userId,
}: useGetAllItemsCartByUserProps) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["items-cart"],
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<IResponseList<IItemCartDetailed>> => {
      const cartRes = await fetch(
        `http://localhost:3001/cart?userId=${userId}`
      );
      const carts = await cartRes.json();
      const cart = carts[0];
      if (!cart) return { data: [] };

      const itemsRes = await fetch(
        `http://localhost:3001/itemsCart?cartId=${cart.id}`
      );
      const items = await itemsRes.json();

      const productsRes = await fetch(`http://localhost:3001/products`);
      const products: IProduct[] = await productsRes.json();

      const detailed: IItemCartDetailed[] = items.map((item: IItemCart) => {
        const product = products.find(
          (product) => product.id === item.productId
        )!;
        return {
          id: item.id,
          productId: item.productId,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: item.quantity,
        };
      });

      useCartStore.setState({ items: detailed });

      return { data: detailed };
    },
  });
};
