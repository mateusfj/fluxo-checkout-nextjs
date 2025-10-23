"use client";
import { StepProgress } from "@/components/@shared/StepProgress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { STEPS } from "@/constants/steps-checkout-form";
import { MapPin } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useMultiStepCheckoutForm } from "./use-multi-step-checkout-form";

const MultiStepCheckoutForm = () => {
  const { form, step, CurrentComponentStep, nextStep, prevStep } =
    useMultiStepCheckoutForm();

  return (
    <FormProvider {...form}>
      <StepProgress currentStep={step} />
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
              {STEPS[step].label}
            </h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CurrentComponentStep />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={prevStep}
              variant="secondary"
              type="button"
              disabled={step === 0}
            >
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
