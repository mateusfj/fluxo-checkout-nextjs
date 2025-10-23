"use client";

import { CheckoutSummaryCard } from "@/components/checkout/checkout-summary-card";
import { MultiStepCheckoutForm } from "@/components/forms/multi-step-checkout-form/multi-step-checkout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function Checkout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCheckout = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsLoading(false);
    };

    loadCheckout();
  }, []);

  const CheckoutSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col gap-4">
            <Skeleton className="h-6 w-24" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full mx-auto p-6 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-32" />
        </div>
        <CheckoutSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4 flex-col">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar para o Carrinho
          </Button>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Checkout
            </h1>
            <p className="text-muted-foreground text-sm">
              Complete sua compra com segurança
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <MultiStepCheckoutForm />
        </div>
        <div className="flex flex-col md:mt-22">
          <CheckoutSummaryCard />
        </div>
      </div>
    </div>
  );
}

export { Checkout };
