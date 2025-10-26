import { CreateOrder, Order, ResponseOrder } from "@/@types/order/IOrder";
import { EPaymentMethod } from "@/constants/enum/payment-method";
import { EStatusPayment } from "@/constants/enum/status-payment";

export async function createOrderMock(
  data: CreateOrder
): Promise<ResponseOrder> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const orderId: string = crypto.randomUUID();

  const baseOrder: Order = {
    orderId,
    status: EStatusPayment.PENDING,
    shipping: data.shipping,
    items: data.items,
    methodPayment: data.methodPayment,
    createdAt: Date.now(),
  };

  switch (data.methodPayment.paymentMethod) {
    case EPaymentMethod.CREDIT:
      baseOrder.status = EStatusPayment.PROCESSING;
      mockDB.set(orderId, baseOrder);

      return {
        orderId,
        status: baseOrder.status,
        paymentUrl: `/checkout/result?orderId=${baseOrder.orderId}`,
      };

    case EPaymentMethod.PIX:
      baseOrder.paymentInfo = {
        pixCode: `00020126580014BR.GOV.BCB.PIX0136${orderId}52040000530398654012345...`,
      };

      mockDB.set(orderId, baseOrder);

      return {
        orderId,
        status: baseOrder.status,
        paymentUrl: `/checkout/payment/pix?orderId=${orderId}`,
      };

    case EPaymentMethod.BOLETO:
      baseOrder.paymentInfo = {
        boletoUrl: `/mock/boleto/${orderId}.pdf`,
        boletoBarcode: `34191.79001 01043.510047 91020.150008 5 92980000019990`,
      };

      mockDB.set(orderId, baseOrder);

      return {
        orderId,
        status: baseOrder.status,
        paymentUrl: `/checkout/payment/boleto?orderId=${orderId}`,
      };
  }
}

export const mockDB = new Map<string, Order>();

export async function getOrderProcessPayment(
  orderId: string
): Promise<Order | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const order = mockDB.get(orderId);
  if (!order) return undefined;

  if (order.status === EStatusPayment.EXPIRED) {
    return order;
  }

  if (order.status === EStatusPayment.PROCESSING) {
    const success =
      Math.random() < 0.5 ? EStatusPayment.PAID : EStatusPayment.FAILED;
    order.status = success;
    mockDB.set(orderId, order);
  }

  return order;
}

export async function getOrder(orderId: string): Promise<Order | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const order = mockDB.get(orderId);
  if (!order) return undefined;

  return order;
}

export function updateOrderStatus(
  orderId: string,
  status: EStatusPayment
): Order | undefined {
  const order = mockDB.get(orderId);
  if (order) {
    order.status = status;
    mockDB.set(orderId, order);
    return order;
  }
}
