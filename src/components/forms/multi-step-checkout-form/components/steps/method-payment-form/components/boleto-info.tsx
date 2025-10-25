import { Receipt } from "lucide-react";

const BoletoInfo = () => {
  return (
    <div className="pt-6 border-t">
      <div className="bg-gray-50 border border-gray-200 rounded-ele p-4">
        <div className="flex items-start gap-3">
          <Receipt className="h-5 w-5 text-gray-800 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">Boleto Bancário</h4>
            <p className="text-sm text-gray-700 mt-1">
              O boleto será gerado ao finalizar a compra, com vencimento em 3
              dias úteis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BoletoInfo };
