import { MultiStepForm } from "@/components/forms/_zod/multi-step-checkout-schema";
import { PaymentMethodForm } from "@/components/forms/multi-step-checkout-form/components/steps/method-payment-form/payment-method-form";
import { OrderReview } from "@/components/forms/multi-step-checkout-form/components/steps/order-review-form/order-review-form";
import { shippingForm } from "@/components/forms/multi-step-checkout-form/components/steps/shipping-form/shipping-form";
import { Check, CreditCard, Truck } from "lucide-react";
import { FC } from "react";

type Step = {
  label: string;
  description: string;
  field: keyof MultiStepForm;
  form: FC;
  icon: React.ElementType;
};

export const STEPS: Step[] = [
  {
    label: "Envio",
    field: "shippingSchema",
    form: shippingForm,
    description: "Informações de envio",
    icon: Truck,
  },
  {
    label: "Pagamento",
    field: "methodPaymentSchema",
    form: PaymentMethodForm,
    description: "Informações de pagamento",
    icon: CreditCard,
  },
  {
    label: "Revisão",
    form: OrderReview,
    field: "orderReviewSchema",
    description: "Revise seu pedido",
    icon: Check,
  },
];
