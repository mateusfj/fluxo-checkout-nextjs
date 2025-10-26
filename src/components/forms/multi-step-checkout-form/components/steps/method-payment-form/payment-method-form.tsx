import { MultiStepForm } from "@/components/forms/_zod/multi-step-checkout-schema";
import { EPaymentMethod } from "@/constants/enum/payment-method";

import { useFormContext } from "react-hook-form";

import { CreditForm } from "./components/credit-form";
import { PaymentMethodSelector } from "./components/payment-method-selector";

import { QrCode, Receipt } from "lucide-react";
import { PaymentInfoCard } from "@/features/checkout/cards/payment-info-card";

const PaymentMethodForm = () => {
  const { watch } = useFormContext<MultiStepForm>();

  return (
    <div>
      <PaymentMethodSelector />

      {watch("methodPaymentSchema.paymentMethod") === EPaymentMethod.CREDIT && (
        <CreditForm />
      )}

      {watch("methodPaymentSchema.paymentMethod") === EPaymentMethod.PIX && (
        <PaymentInfoCard
          title="Pagamento via Pix"
          message="Ao finalizar a compra, um QR Code será gerado. Use o app do seu banco para pagar e a aprovação é instantânea."
          icon={<QrCode className="h-5 w-5 mt-0.5" />}
        />
      )}

      {watch("methodPaymentSchema.paymentMethod") === EPaymentMethod.BOLETO && (
        <PaymentInfoCard
          icon={<Receipt className="h-5 w-5 mt-0.5" />}
          title="Boleto Bancário"
          message="O boleto será gerado ao finalizar a compra, com vencimento em 3 dias úteis."
        />
      )}
    </div>
  );
};

export { PaymentMethodForm };
