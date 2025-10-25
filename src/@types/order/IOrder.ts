import { IItemCartOrder } from "@/@types/cart/ICart";
import { MethodPaymentForm } from "@/components/forms/_zod/method-payment-schema";
import { ShippingForm } from "@/components/forms/_zod/shipping-schema";

export type CreateOrder = {
  shipping: ShippingForm;
  methodPayment: MethodPaymentForm;
  items: IItemCartOrder[];
};

export type Order = {
  orderId: string;
  status: string;
  createdAt: number;
  paymentInfo?: {
    pixCode?: string;
    boletoUrl?: string;
    boletoBarcode?: string;
  };
} & CreateOrder;

export type ResponseOrder = {
  orderId: string;
  status: string;
  paymentUrl?: string;
};
