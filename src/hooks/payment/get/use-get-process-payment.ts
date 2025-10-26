import { Order } from "@/@types/order/IOrder";
import { EStatusPayment } from "@/constants/enum/status-payment";
import { getOrderProcessPayment } from "@/@mock/order-mock-api";
import { useCartStore } from "@/stores/use-cart-store";
import { useQuery } from "@tanstack/react-query";

const useGetOrderProcess = (orderId: string, enabled = true) => {
  const { clearCart } = useCartStore();
  return useQuery({
    queryFn: async (): Promise<Order> => {
      const order: Order | undefined = await getOrderProcessPayment(orderId);

      if (!order) {
        throw new Error("Erro ao buscar pedido");
      }

      if (order.status == EStatusPayment.PAID) clearCart();

      return { ...order };
    },
    enabled,
    queryKey: ["orders", orderId],
    staleTime: 0,
  });
};

export { useGetOrderProcess };
