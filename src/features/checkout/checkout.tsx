"use client";

import { ActionHeader } from "@/components/@shared/action-header/action-header";
import { SummaryCard } from "@/components/cards/summary-card/summary-card";
import { MultiStepCheckoutForm } from "@/components/forms/multi-step-checkout-form/multi-step-checkout-form";
import { CheckoutSkeleton } from "@/features/checkout/skeletons/checkout-skeleton";
import { useCartStore } from "@/stores/use-cart-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { push } = useRouter();
  const { getUserCart } = useCartStore();

  if (getUserCart().length === 0) {
    push("/cart");
  }

  useEffect(() => {
    const loadCheckout = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsLoading(false);
    };

    loadCheckout();
  }, []);

  if (isLoading) {
    return <CheckoutSkeleton />;
  }

  return (
    <div>
      <ActionHeader
        textButton="Voltar para o carrinho"
        title="Checkout"
        description="Complete sua compra com segurança"
        href="/cart"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MultiStepCheckoutForm />
        </div>
        <div className="mt-0 md:mt-16">
          <SummaryCard />
        </div>
      </div>
    </div>
  );
};

export { Checkout };
