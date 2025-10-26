"use client";

import { MultiStepForm } from "@/components/forms/_zod/multi-step-checkout-schema";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EPaymentMethod } from "@/constants/enum/payment-method";
import { CreditCard, QrCode, Receipt } from "lucide-react";
import { useFormContext } from "react-hook-form";

const PaymentMethodSelector = () => {
  const { watch, setValue } = useFormContext<MultiStepForm>();

  return (
    <div className="flex flex-col gap-4 pb-6 ">
      <RadioGroup
        value={watch("methodPaymentSchema.paymentMethod")}
        onValueChange={(value) =>
          setValue("methodPaymentSchema.paymentMethod", value as EPaymentMethod)
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <Label
            htmlFor="pix"
            className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-accent"
          >
            <RadioGroupItem value="pix" id="pix" />
            <QrCode className="h-6 w-6 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-semibold">Pix</p>
              <p className="text-xs text-muted-foreground font-normal">
                Aprovação instantânea
              </p>
            </div>
          </Label>

          <Label
            htmlFor="credit"
            className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-accent"
          >
            <RadioGroupItem value="credit" id="credit" />
            <CreditCard className="h-6 w-6 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-semibold">Cartão de Crédito</p>
              <p className="text-xs font-normal text-muted-foreground text">
                Parcelamento em até 12x
              </p>
            </div>
          </Label>

          {/* Label Boleto */}
          <Label
            htmlFor="boleto"
            className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-accent"
          >
            <RadioGroupItem value="boleto" id="boleto" />
            <Receipt className="h-6 w-6 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-semibold">Boleto Bancário</p>
              <span className="text-xs text-muted-foreground font-normal ">
                Vencimento em 3 dias úteis
              </span>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export { PaymentMethodSelector };
