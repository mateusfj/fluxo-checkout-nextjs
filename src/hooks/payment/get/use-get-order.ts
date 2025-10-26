import { Order } from "@/@types/order/IOrder";
import { getOrder } from "@/@mock/order-mock-api";
import { useQuery } from "@tanstack/react-query";

const useGetOrder = (orderId: string) => {
  return useQuery({
    queryFn: async (): Promise<Order> => {
      const order: Order | undefined = await getOrder(orderId);

      if (!order) {
        throw new Error("Erro ao buscar produtos");
      }
      return { ...order };
    },
    queryKey: ["orders", orderId],
  });
};

export { useGetOrder };
