"use client";

import { useSearchParams } from "next/navigation";

import { ActionHeader } from "@/components/@shared/action-header/action-header";
import { OrderStatusDisplay } from "@/features/checkout/result/components/order-status-display/order-status-display";

const Order = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const expired = searchParams.get("expired");

  return (
    <div>
      <ActionHeader
        title="Acompanhando pedido"
        description={`pedido #${orderId}`}
      />
      <OrderStatusDisplay orderId={orderId!} expired={Boolean(expired)} />
    </div>
  );
};

export { Order };
