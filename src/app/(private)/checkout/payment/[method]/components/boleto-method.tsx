import { Order } from "@/@types/order/IOrder";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

const BoletoMethod = ({ order }: { order: Order }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gray-100 p-8 rounded-lg">
          <div className="text-xs font-mono tracking-wider">
            {order?.paymentInfo?.boletoBarcode}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Código de barras do boleto
        </p>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Baixar PDF
        </Button>
        <Button variant="outline">
          <Copy className="h-4 w-4 mr-2" />
          Copiar código
        </Button>
      </div>
    </div>
  );
};

export { BoletoMethod };
