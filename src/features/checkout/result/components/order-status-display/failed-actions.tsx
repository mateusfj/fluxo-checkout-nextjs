"use client";

import { Button } from "@/components/ui/button";

interface FailedActionsProps {
  onTryAgain: () => void;
}

export function FailedActions({ onTryAgain }: FailedActionsProps) {
  return (
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
            <span>Entre em contato com seu banco se o problema persistir</span>
          </li>
        </ul>
      </div>
      <Button
        onClick={onTryAgain}
        variant="destructive"
        className="w-full"
        size="lg"
      >
        Tentar novamente
      </Button>
    </div>
  );
}
