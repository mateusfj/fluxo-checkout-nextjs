import { STEPS } from "@/constants/steps-checkout-form";
import { AuthContext } from "@/utils/providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MultiStepForm,
  multiStepCheckoutSchema,
} from "../_zod/multi-step-checkout-schema";

export const useMultiStepCheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const [step, setStep] = useState<number>(0);
  const form = useForm<MultiStepForm>({
    resolver: zodResolver(multiStepCheckoutSchema),
    defaultValues: {
      shippingSchema: {
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
  });

  const CurrentComponentStep = STEPS[step].form;

  const incrementStep = () => setStep((prev) => prev + 1);
  const decrementStep = () => setStep((prev) => prev - 1);

  const nextStep = async () => {
    const isValid = await form.trigger(STEPS[step].field);
    console.log("isValid:", isValid);
    if (!isValid) return;
    incrementStep();
    // form.handleSubmit(onSubmit)();
  };

  const onSubmit = (data: MultiStepForm) => {
    console.log("Form Data:", data);
  };

  const prevStep = () => {
    if (step === 0) return;
    decrementStep();
  };

  return {
    step,
    form,
    CurrentComponentStep,
    nextStep,
    prevStep,
    onSubmit,
  };
};
