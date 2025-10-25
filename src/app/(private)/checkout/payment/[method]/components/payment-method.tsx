"use client";

import { ActionHeader } from "@/components/@shared/action-header/action-header";
import { SummaryCard } from "@/components/cards/summary-card/summary-card";
import { CheckoutSkeleton } from "@/components/skeletons/checkout-skeleton/checkout-skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EPaymentMethod } from "@/constants/enum/payment-method";
import { EStatusPayment } from "@/constants/enum/status-payment";
import { useGetStatusOrder } from "@/hooks/payment/get/use-get-status-order";
import { updateOrderStatus } from "@/mock/create-order-mock";
import { getMethodHeaderInfo } from "@/utils/functions/get-method-header-info";
import { RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PaymentRenderer from "./payment-render";

const PaymentMethod = ({ method }: { method: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const {
    data: orderResult,
    isLoading: isLoadingOrder,
    isError: isErrorOrder,
  } = useGetStatusOrder(orderId!);

  setTimeout(() => {
    const rand = Math.random();
    let newStatus: EStatusPayment;

    if (rand < 0.33) {
      newStatus = EStatusPayment.PAID;
    } else if (rand < 0.33) {
      newStatus = EStatusPayment.FAILED;
    } else {
      newStatus = EStatusPayment.EXPIRED;
    }

    updateOrderStatus(orderId!, EStatusPayment.EXPIRED);
  }, 10000);

  useEffect(() => {
    if (orderResult && orderResult?.status !== EStatusPayment.PENDING) {
      router.push(
        `/checkout/result?orderId=${orderId}&status=${orderResult?.status}`
      );
    }
  }, [orderResult]);

  if (isErrorOrder) {
    return <div>Erro ao carregar o pedido. Por favor, tente novamente.</div>;
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
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {method === "pix" ? "PIX" : "Boleto Bancário"}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Atualizando automaticamente...</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <PaymentRenderer
                method={method as EPaymentMethod}
                order={orderResult!}
              />
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <RefreshCw className="h-4 w-4" />
                  <span className="font-medium">Aguardando pagamento...</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  Status:{" "}
                  <span className="font-medium">{orderResult?.status}</span>
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Esta página será atualizada automaticamente quando o pagamento
                  for confirmado.
                </p>
              </div>
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

export { PaymentMethod };
