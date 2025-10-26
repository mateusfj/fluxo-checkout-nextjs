"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EStatusPayment } from "@/constants/enum/status-payment";
import { STATUS_CONFIG } from "@/constants/payment/order-status.config";
import { useGetOrderProcess } from "@/hooks/payment/get/use-get-process-payment";
import { useRouter } from "next/navigation";
import { StatusCard } from "./status-card";
import { PaidActions } from "./paid-actions";
import { FailedActions } from "./failed-actions";

interface OrderStatusDisplayProps {
  orderId: string;
  expired: boolean;
}

export function OrderStatusDisplay({
  orderId,
  expired,
}: OrderStatusDisplayProps) {
  const router = useRouter();

  const {
    data: orderResult,
    isFetching: isFetchingOrder,
    isError: isErrorOrder,
  } = useGetOrderProcess(orderId!, !expired);

  const handleTryAgain = () => {
    router.push("/checkout");
  };

  const handleGoToProducts = () => {
    router.push("/");
  };

  if (isErrorOrder) {
    const errorInfo = STATUS_CONFIG.default;
    return (
      <Card className="border-none shadow-none items-center bg-transparent">
        <CardContent className="space-y-6 max-w-md">
          <StatusCard
            title="Erro ao carregar dados"
            description="Não foi possível verificar o status do seu pedido. Tente recarregar a página."
            color="text-destructive"
            Icon={errorInfo.Icon}
            goToHome
          />
        </CardContent>
      </Card>
    );
  }

  const getStatus = () => {
    if (expired) return EStatusPayment.EXPIRED;
    if (isFetchingOrder) return EStatusPayment.PROCESSING;
    return orderResult?.status || EStatusPayment.PROCESSING;
  };

  const status = getStatus();

  const statusInfo = STATUS_CONFIG[status] || STATUS_CONFIG.default;

  return (
    <Card className="border-none shadow-none items-center bg-transparent">
      <CardContent className="space-y-6 max-w-md">
        <StatusCard
          title={statusInfo.title}
          description={statusInfo.description}
          color={statusInfo.color}
          Icon={statusInfo.Icon}
        />

        {status === EStatusPayment.PAID && (
          <PaidActions onContinueShopping={handleGoToProducts} />
        )}

        {(status === EStatusPayment.FAILED ||
          status === EStatusPayment.EXPIRED) && (
          <FailedActions onTryAgain={handleTryAgain} />
        )}
      </CardContent>
    </Card>
  );
}
