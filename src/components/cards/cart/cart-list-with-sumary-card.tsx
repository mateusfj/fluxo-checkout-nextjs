"use client";

import { EmptyCard } from "@/components/@shared/empty/empty-card";
import { useCartStore } from "@/stores/use-cart-store";
import { useRouter } from "next/navigation";
import { SummaryCard } from "../summary-card/summary-card";
import { CartList } from "./cart-list";

const CartListWithSummaryCard = () => {
  const { push } = useRouter();
  const { getUserCart } = useCartStore();

  const handleContinueShopping = () => {
    push("/");
  };

  if (getUserCart().length === 0) {
    return (
      <EmptyCard
        onClick={handleContinueShopping}
        message="Seu carrinho está vazio"
        buttonText="Continue comprando"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <CartList />
      </div>
      <div>
        <SummaryCard enabledButton />
      </div>
    </div>
  );
};

export { CartListWithSummaryCard };
