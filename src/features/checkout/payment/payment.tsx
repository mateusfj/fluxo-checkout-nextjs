"use client";

import { ActionHeader } from "@/components/@shared/action-header/action-header";
import { SummaryCard } from "@/components/cards/summary-card/summary-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EPaymentMethod } from "@/constants/enum/payment-method";
import { getMethodHeaderInfo } from "@/constants/payment/get-method-header-info";
import { useSearchParams } from "next/navigation";

import { useGetOrder } from "@/hooks/payment/get/use-get-order";
import { CheckoutSkeleton } from "@/features/checkout/skeletons/checkout-skeleton";
import PaymentRenderer from "./components/payment-render/payment-render";
import { StatusCard } from "../result/components/order-status-display/status-card";
import { AlertCircle } from "lucide-react";

const Payment = ({ method }: { method: string }) => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const {
    data: orderResult,
    isLoading: isLoadingOrder,
    isError: isErrorOrder,
  } = useGetOrder(orderId!);

  if (isErrorOrder) {
    return (
      <StatusCard
        Icon={() => <AlertCircle className="h-16 w-16" />}
        color="text-destructive"
        description="Não foi possível carregar os dados do pedido. Por favor, tente mais tarde."
        title="Erro ao carregar o pedido"
        goToHome
      />
    );
  }

  if (isLoadingOrder) {
    return <CheckoutSkeleton />;
  }

  return (
    <div>
      <ActionHeader
        title={getMethodHeaderInfo(method).title}
        description={getMethodHeaderInfo(method).description}
        textButton="Voltar ao checkout"
        href="/checkout"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {method === "pix" ? "PIX" : "Boleto Bancário"}
                </h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <PaymentRenderer
                method={method as EPaymentMethod}
                order={orderResult!}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <SummaryCard />
        </div>
      </div>
    </div>
  );
};

export { Payment };
