import { Order } from "@/@types/order/IOrder";
import { getOrder } from "@/mock/create-order-mock";
import { Query, useQuery } from "@tanstack/react-query";

const useGetStatusOrder = (orderId: string) => {
  return useQuery({
    queryFn: async (): Promise<Order> => {
      const order: Order | undefined = await getOrder(orderId);

      if (!order) {
        throw new Error("Erro ao buscar produtos");
      }

      return { ...order };
    },
    queryKey: ["orders", orderId],
    refetchInterval: (query: Query<Order, Error, Order, string[]>) => {
      return query.state.status === "error" ? false : 3000;
    },
  });
};

export { useGetStatusOrder };
