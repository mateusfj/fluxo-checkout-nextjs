import { EPaymentMethod } from "@/constants/enum/payment-method";
import { Order } from "../order/IOrder";

export interface PaymentComponentMapItem {
  method: EPaymentMethod;
  component: React.ComponentType<{ order: Order }>;
}
