import { QrCode } from "lucide-react";

const PixInfo = () => {
  return (
    <div className="pt-6 border-t">
      <div className="bg-blue-50 border border-blue-200 rounded-ele p-4">
        <div className="flex items-start gap-3">
          <QrCode className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Pagamento via Pix</h4>
            <p className="text-sm text-blue-700 mt-1">
              Ao finalizar a compra, um QR Code será gerado. Use o app do seu
              banco para pagar e a aprovação é instantânea.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PixInfo };
