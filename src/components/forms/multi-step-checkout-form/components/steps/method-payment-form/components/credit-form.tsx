"use client";

import { CustomSelect } from "@/components/custom-form-components/custom-select";
import { CustomTextInput } from "@/components/custom-form-components/custom-text-input";
import { MultiStepForm } from "@/components/forms/_zod/multi-step-checkout-schema";
import { cardMask } from "@/utils/functions/masks/cardMask";
import { useFormContext } from "react-hook-form";

const CreditForm = () => {
  const { control } = useFormContext<MultiStepForm>();

  return (
    <div className="flex flex-col gap-4 pt-6 border-t">
      <CustomTextInput
        name="methodPaymentSchema.cardName"
        control={control}
        label="Nome no cartão *"
        placeholder="Digite o nome do cartão"
      />

      <CustomTextInput
        name="methodPaymentSchema.cardNumber"
        control={control}
        label="Número do cartão *"
        placeholder="0000 0000 0000 0000"
        mask={cardMask}
      />

      <div className="grid grid-cols-3 gap-4">
        <CustomSelect
          name="methodPaymentSchema.expiryMonth"
          placeholder="MM"
          control={control}
          options={Array.from({ length: 12 }, (_, i) => ({
            label: String(i + 1).padStart(2, "0"),
            value: String(i + 1).padStart(2, "0"),
          }))}
          label="Mês *"
        />

        <CustomSelect
          name="methodPaymentSchema.expiryYear"
          placeholder="YYYY"
          control={control}
          options={Array.from({ length: 10 }, (_, i) => ({
            label: String(2024 + i),
            value: String(2024 + i),
          }))}
          label="Ano *"
        />

        <CustomTextInput
          name="methodPaymentSchema.cardCVC"
          control={control}
          label="CVC *"
          placeholder="123"
        />
      </div>

      <CustomSelect
        name="methodPaymentSchema.parcels"
        label="Parcelas *"
        control={control}
        options={Array.from({ length: 12 }, (_, i) => ({
          label: `${i + 1}x sem juros`,
          value: String(i + 1),
        }))}
      />
    </div>
  );
};

export { CreditForm };
