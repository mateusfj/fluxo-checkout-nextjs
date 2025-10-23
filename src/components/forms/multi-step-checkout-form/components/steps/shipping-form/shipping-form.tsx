"use client";

import { CustomSelect } from "@/components/custom-components/custom-select";
import { CustomTextInput } from "@/components/custom-components/custom-text-input";
import { MultiStepForm } from "@/components/forms/_zod/multi-step-checkout-schema";
import { STATES } from "@/constants/@shared/states";
import { phoneMask } from "@/utils/functions/masks/phoneMask";
import { useFormContext } from "react-hook-form";

const shippingForm = () => {
  const { control } = useFormContext<MultiStepForm>();

  return (
    <div className="flex flex-col gap-4">
      <CustomTextInput
        control={control}
        name="shippingSchema.name"
        label="Nome *"
        placeholder="Nome Completo"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomTextInput
          control={control}
          name="shippingSchema.email"
          label="Email *"
          placeholder="Email"
        />
        <CustomTextInput
          control={control}
          name="shippingSchema.phone"
          label="Telefone"
          mask={phoneMask}
          placeholder="(00) 00000-0000"
        />
      </div>
      <CustomTextInput
        control={control}
        name="shippingSchema.street"
        label="Rua *"
        placeholder="Digite o nome da rua"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CustomTextInput
          control={control}
          name="shippingSchema.city"
          label="Cidade *"
          placeholder="Digite sua cidade"
        />
        <CustomSelect
          name="shippingSchema.state"
          label="Estado *"
          placeholder="Selecione seu estado"
          options={STATES.map((state) => ({
            label: state.name,
            value: state.value,
          }))}
          control={control}
        />
        <CustomTextInput
          control={control}
          name="shippingSchema.zipCode"
          label="CEP *"
          placeholder="00000-000"
        />
      </div>
    </div>
  );
};

export { shippingForm };
