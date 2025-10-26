import { CreateOrder, ResponseOrder } from "@/@types/order/IOrder";
import { IError } from "@/@types/services/IError";
import { EStatusPayment } from "@/constants/enum/status-payment";
import { createOrderMock } from "@/mock/order-mock";

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
      toast.error(error.message);
    },

    onSuccess(data: ResponseOrder): void {
      push(data.paymentUrl!);
    },
  });
};
