import { STEPS } from "@/constants/steps-checkout-form";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  steps: typeof STEPS;
}

export function StepProgress({ currentStep, steps }: StepProgressProps) {
  return (
    <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 py-4">
      {steps.map(({ label, icon: Icon }, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-200",
                currentStep >= index
                  ? "bg-primary border-primary text-white"
                  : "border-border text-muted-foreground"
              )}
            >
              {currentStep > index ? (
                <Check className="h-4 w-4" />
              ) : (
                <Icon className="h-4 w-4" />
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium hidden sm:block",
                currentStep >= index
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-8 h-0.5 transition-colors duration-200",
                currentStep > index ? "bg-primary" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
