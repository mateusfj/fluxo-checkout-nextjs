"use client";

import { addressSchema } from "@/components/Forms/_zod/shipping-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export type AddressFormValues = z.infer<typeof addressSchema>;

interface UseAddressFormProps {
  onValidSubmit: (data: AddressFormValues) => void;
}

export const useAddressForm = ({ onValidSubmit }: UseAddressFormProps) => {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  return {
    form,
    triggerSubmit: form.handleSubmit(onValidSubmit),
  };
};
