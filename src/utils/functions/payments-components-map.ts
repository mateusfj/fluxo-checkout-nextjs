import { PaymentComponentMapItem } from "@/@types/payment/payment";
import { BoletoMethod } from "@/app/(private)/checkout/payment/[method]/components/boleto-method";
import { PixMethod } from "@/app/(private)/checkout/payment/[method]/components/pix-method";
import { EPaymentMethod } from "@/constants/enum/payment-method";

export const paymentComponentsMap: PaymentComponentMapItem[] = [
  { method: EPaymentMethod.PIX, component: PixMethod },
  { method: EPaymentMethod.BOLETO, component: BoletoMethod },
];
