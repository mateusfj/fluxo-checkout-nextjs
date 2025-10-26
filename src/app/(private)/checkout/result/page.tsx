"use client";

import { useSearchParams } from "next/navigation";
import { OrderStatusDisplay } from "./components/order-status-display/order-status-display";
import { ActionHeader } from "@/components/@shared/action-header/action-header";

export default function OrderStatusPage() {
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
}
