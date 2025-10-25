import { CreateOrder, ResponseOrder } from "@/@types/order/IOrder";
import { IError } from "@/@types/services/IError";
import { EStatusPayment } from "@/constants/enum/status-payment";
import { createOrderMock } from "@/mock/create-order-mock";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateOrder = () => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: async (order: CreateOrder): Promise<ResponseOrder> => {
      return await createOrderMock(order);
    },

    onError(error: IError): void {
      push(`/checkout/result?status=${error.status ?? "falhado"}`);
      toast.error(error.message);
    },

    onSuccess(data: ResponseOrder): void {
      if (data.status === EStatusPayment.PAID) {
        push(`/checkout/result?status=${data.status}&orderId=${data.orderId}`);
      } else if (data.status === EStatusPayment.PENDING) {
        push(data.paymentUrl!);
      }
    },
  });
};
