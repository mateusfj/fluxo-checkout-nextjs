"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { OrderStatus } from "@/lib/order";
import { getOrderStatusInfo } from "@/lib/order";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  XCircle,
} from "lucide-react";

interface OrderStatusDisplayProps {
  orderId: string;
  status: OrderStatus;
  onTryAgain?: () => void;
  onGoToProducts?: () => void;
}

export function OrderStatusDisplay({
  orderId,
  status,
  onTryAgain,
  onGoToProducts,
}: OrderStatusDisplayProps) {
  const statusInfo = getOrderStatusInfo(status);

  const getIcon = () => {
    switch (statusInfo.icon) {
      case "check":
        return <CheckCircle2 className="h-16 w-16" />;
      case "x":
        return <XCircle className="h-16 w-16" />;
      case "clock":
        return <Clock className="h-16 w-16" />;
      case "loader":
        return <Loader2 className="h-16 w-16 animate-spin" />;
      default:
        return <AlertCircle className="h-16 w-16" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status do Pedido</CardTitle>
        <CardDescription>Pedido #{orderId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className={cn("mb-4", statusInfo.color)}>{getIcon()}</div>
          <h2 className="text-2xl font-bold mb-2">{statusInfo.title}</h2>
          <p className="text-muted-foreground max-w-md text-pretty">
            {statusInfo.description}
          </p>
        </div>

        {status === "processing" && (
          <div className="rounded-lg bg-accent/50 p-4">
            <p className="text-sm text-muted-foreground text-center">
              Aguarde enquanto processamos seu pagamento. Não feche esta página.
            </p>
          </div>
        )}

        {status === "paid" && (
          <div className="space-y-3">
            <div className="rounded-lg border bg-muted p-4">
              <h3 className="font-semibold mb-2">Próximos passos:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Você receberá um email de confirmação em instantes
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Seu pedido será preparado e enviado em até 2 dias úteis
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Você pode acompanhar o status do envio pelo email</span>
                </li>
              </ul>
            </div>
            {onGoToProducts && (
              <Button onClick={onGoToProducts} className="w-full" size="lg">
                Continuar comprando
              </Button>
            )}
          </div>
        )}

        {(status === "failed" || status === "expired") && (
          <div className="space-y-3">
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <h3 className="font-semibold mb-2 text-destructive">
                O que fazer agora?
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-destructive">•</span>
                  <span>Verifique os dados do pagamento e tente novamente</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive">•</span>
                  <span>Tente usar outro método de pagamento</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive">•</span>
                  <span>
                    Entre em contato com seu banco se o problema persistir
                  </span>
                </li>
              </ul>
            </div>
            {onTryAgain && (
              <Button
                onClick={onTryAgain}
                variant="destructive"
                className="w-full"
                size="lg"
              >
                Tentar novamente
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
