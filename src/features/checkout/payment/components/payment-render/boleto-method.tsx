"use client";

import { Order } from "@/@types/order/IOrder";
import { Button } from "@/components/ui/button";
import { EStatusPayment } from "@/constants/enum/status-payment";
import { updateOrderStatus } from "@/@mock/order-mock-api";
import { formatTime } from "@/utils/functions/format-time";

import { Copy, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BoletoMethod = ({ order }: { order: Order }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [copied, setCopied] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      updateOrderStatus(order.orderId, EStatusPayment.EXPIRED);
      push(`/checkout/result?orderId=${order.orderId}&expired=true`);
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, order.orderId, push]);

  const handleCopy = () => {
    navigator.clipboard.writeText(order?.paymentInfo?.boletoBarcode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    updateOrderStatus(order.orderId, EStatusPayment.PROCESSING);
    push(`/checkout/result?orderId=${order.orderId}`);
  };

  const isExpired = timeLeft <= 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-muted p-8 rounded-lg">
          <div className="text-xs font-mono tracking-wider break-all">
            {order?.paymentInfo?.boletoBarcode}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Código de barras do boleto
        </p>

        <p
          className={`mt-2 text-sm font-medium ${
            isExpired ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {isExpired ? "Boleto expirado" : `Expira em ${formatTime(timeLeft)}`}
        </p>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1" disabled={isExpired}>
          <Download className="h-4 w-4 mr-2" />
          Baixar PDF
        </Button>

        <Button variant="outline" onClick={handleCopy} disabled={isExpired}>
          <Copy className="h-4 w-4 mr-2" />
          {copied ? "Copiado!" : "Copiar código"}
        </Button>
      </div>

      <Button
        className="w-full"
        onClick={handleConfirmPayment}
        disabled={isExpired}
      >
        {isExpired ? "Boleto expirado" : "Confirmar pagamento"}
      </Button>
    </div>
  );
};

export { BoletoMethod };
