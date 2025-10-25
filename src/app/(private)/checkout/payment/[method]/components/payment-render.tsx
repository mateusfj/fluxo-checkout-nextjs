import { Order } from "@/@types/order/IOrder";
import { PaymentComponentMapItem } from "@/@types/payment/payment";
import { EPaymentMethod } from "@/constants/enum/payment-method";
import { paymentComponentsMap } from "@/utils/functions/payments-components-map";

interface PaymentRendererProps {
  method: EPaymentMethod;
  order: Order;
}

export default function PaymentRenderer({
  method,
  order,
}: PaymentRendererProps) {
  const entry: PaymentComponentMapItem | undefined = paymentComponentsMap.find(
    (e: PaymentComponentMapItem): boolean => e.method === method
  );

  if (!entry) return <p>Método de pagamento não suportado</p>;

  const Component = entry.component;
  return <Component order={order} />;
}
