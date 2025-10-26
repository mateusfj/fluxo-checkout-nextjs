"use client";

import { Order } from "@/@types/order/IOrder";
import { Button } from "@/components/ui/button";
import { EStatusPayment } from "@/constants/enum/status-payment";
import { updateOrderStatus } from "@/mock/order-mock";

import { formatTime } from "@/utils/functions/format-time";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PixMethod = ({ order }: { order: Order }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const { push } = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      updateOrderStatus(order.orderId, EStatusPayment.EXPIRED);
      push(`/checkout/result?orderId=${order.orderId}&expired=true`);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(order?.paymentInfo?.pixCode!);
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
        <img
          src="/images/pix-qrcode-simulado.png"
          alt="QR Code"
          className="h-100 w-100 mx-auto text-gray-400"
        />
        <p className="text-sm text-muted-foreground mt-4">
          Escaneie o QR Code com seu app bancário
        </p>
        <p
          className={`mt-2 text-sm font-medium ${
            isExpired ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {isExpired
            ? "Código PIX expirado"
            : `Expira em ${formatTime(timeLeft)}`}
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-medium">Ou copie o código PIX:</p>
        <div className="flex gap-2 items-center">
          <code className="flex-1 p-3 bg-muted rounded text-xs break-all">
            {order?.paymentInfo?.pixCode}
          </code>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyPixCode}
            disabled={isExpired}
            className="shrink-0"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copiado!" : "Copiar"}
          </Button>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleConfirmPayment}
        disabled={isExpired}
      >
        {isExpired ? "Código expirado" : "Confirmar pagamento"}
      </Button>
    </div>
  );
};

export { PixMethod };
