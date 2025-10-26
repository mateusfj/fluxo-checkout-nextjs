import { PaymentComponentMapItem } from "@/@types/payment/IPayment";

import { EPaymentMethod } from "@/constants/enum/payment-method";
import { BoletoMethod } from "@/features/checkout/payment/components/payment-render/boleto-method";
import { PixMethod } from "@/features/checkout/payment/components/payment-render/pix-method";

export const paymentComponentsMap: PaymentComponentMapItem[] = [
  { method: EPaymentMethod.PIX, component: PixMethod },
  { method: EPaymentMethod.BOLETO, component: BoletoMethod },
];
