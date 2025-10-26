"use client";

import { Button } from "@/components/ui/button";

interface PaidActionsProps {
  onContinueShopping: () => void;
}

export function PaidActions({ onContinueShopping }: PaidActionsProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border bg-muted p-4">
        <h3 className="font-semibold mb-2">Próximos passos:</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Você receberá um email de confirmação em instantes</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Seu pedido será preparado e enviado em até 2 dias úteis</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>Você pode acompanhar o status do envio pelo email</span>
          </li>
        </ul>
      </div>
      <Button onClick={onContinueShopping} className="w-full" size="lg">
        Continuar comprando
      </Button>
    </div>
  );
}
