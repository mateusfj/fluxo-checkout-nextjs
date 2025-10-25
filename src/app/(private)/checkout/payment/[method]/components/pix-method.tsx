"use client";

import { Order } from "@/@types/order/IOrder";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

const PixMethod = ({ order }: { order: Order }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(order?.paymentInfo?.pixCode!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
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
      </div>
      <div className="space-y-3">
        <p className="text-sm font-medium">Ou copie o código PIX:</p>
        <div className="flex gap-2">
          <code className="flex-1 p-3 bg-gray-100 rounded text-xs break-all">
            {order?.paymentInfo?.pixCode}
          </code>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyPixCode}
            className="shrink-0"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copiado!" : "Copiar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { PixMethod };
