"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import { FC, useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { AuthContext } from "@/utils/providers/AuthProvider";
import {
  multiStepCheckoutSchema,
  MultiStepForm,
} from "../_zod/multi-step-checkout-schema";
import { MethodForm } from "../method-form/card-method-form";
import { shippingForm } from "./components/steps/shipping-form/shipping-form";

type Step = {
  name: string;
  field: keyof MultiStepForm;
  form: FC;
};

export const steps: Step[] = [
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

const MultiStepCheckoutForm = () => {
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

  const CurrentComponentStep = steps[step].form;

  const incrementStep = () => setStep((prev) => prev + 1);
  const decrementStep = () => setStep((prev) => prev - 1);

  const nextStep = async () => {
    const isValid = await form.trigger(steps[step].field);
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

  return (
    <FormProvider {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nextStep();
        }}
      >
        <Card className="flex flex-col gap-6">
          <CardHeader>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {steps[step].name}
            </h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CurrentComponentStep />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={prevStep} variant="secondary" type="button">
              Voltar
            </Button>
            <Button onClick={nextStep} type="submit">
              {step !== 2 ? "Continuar" : "Finalizar"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export { MultiStepCheckoutForm };
