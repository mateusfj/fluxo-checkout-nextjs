"use client";
import { StepProgress } from "@/components/@shared/step-progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { STEPS } from "@/constants/steps-checkout-form";
import { useCartStore } from "@/stores/use-cart-store";
import { formatToBRLMask } from "@/utils/functions/masks/moneyMask";
import { MapPin } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useMultiStepCheckoutForm } from "./use-multi-step-checkout-form";

const MultiStepCheckoutForm = () => {
  const {
    form,
    step,
    CurrentComponentStep,
    nextStep,
    prevStep,
    isCreatingOrder,
  } = useMultiStepCheckoutForm();

  const getButtonContent = () => {
    if (step !== 2) {
      return "Continuar";
    }

    if (isCreatingOrder) {
      return (
        <>
          <Spinner className="mr-2" /> Processando...
        </>
      );
    }

    return `Pagar ${formatToBRLMask(getTotalPrice())}`;
  };

  const { getTotalPrice } = useCartStore();

  return (
    <FormProvider {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nextStep();
        }}
      >
        <StepProgress currentStep={step} steps={STEPS} />
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
            <Button type="submit" disabled={isCreatingOrder}>
              {getButtonContent()}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export { MultiStepCheckoutForm };
