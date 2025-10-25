import { MultiStepForm } from "@/components/forms/_zod/multi-step-checkout-schema";
import { EPaymentMethod } from "@/constants/enum/payment-method";

import { useFormContext } from "react-hook-form";
import { BoletoInfo } from "./components/boleto-info";
import { CreditCardForm } from "./components/credit-card-form";
import { PaymentMethodSelector } from "./components/payment-method-selector";
import { PixInfo } from "./components/pix-info";

const PaymentMethodForm = () => {
  const { control, watch } = useFormContext<MultiStepForm>();

  return (
    <div>
      <PaymentMethodSelector />

      {watch("methodPaymentSchema.paymentMethod") === EPaymentMethod.CREDIT && (
        <CreditCardForm />
      )}

      {watch("methodPaymentSchema.paymentMethod") === EPaymentMethod.PIX && (
        <PixInfo />
      )}

      {watch("methodPaymentSchema.paymentMethod") === EPaymentMethod.BOLETO && (
        <BoletoInfo />
      )}
    </div>
  );
};

export { PaymentMethodForm };
