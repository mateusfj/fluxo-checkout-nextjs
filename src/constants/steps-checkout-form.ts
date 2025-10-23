import { MultiStepForm } from "@/components/Forms/_zod/multi-step-checkout-schema";
import { MethodForm } from "@/components/Forms/multi-step-checkout-form/components/steps/method-form/method-form";
import { shippingForm } from "@/components/Forms/multi-step-checkout-form/components/steps/shipping-form/shipping-form";
import { FC } from "react";

type Step = {
  name: string;
  field: keyof MultiStepForm;
  form: FC;
};

export const STEPS: Step[] = [
  {
    name: "Informações de envio",
    field: "shippingSchema",
    form: shippingForm,
  },
  {
    name: "Payment Information",
    field: "methodPaymentSchema",
    form: MethodForm,
  },
];
