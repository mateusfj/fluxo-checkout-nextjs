"use client";

import { ActionHeader } from "@/components/@shared/action-header/action-header";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function ResultadoCheckoutPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");
  const message = searchParams.get("message");

  const renderResult = () => {
    return (
      <Card className=" border-none shadow-none">
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <h2 className="text-2xl font-bold mb-2">{""}</h2>
            <p className="text-muted-foreground max-w-md text-pretty">
              {"xxxxxxx"}
            </p>
          </div>

          {status === "processing" && (
            <div className="rounded-lg bg-accent/50 p-4">
              <p className="text-sm text-muted-foreground text-center">
                Aguarde enquanto processamos seu pagamento. Não feche esta
                página.
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
                    <span>
                      Você pode acompanhar o status do envio pelo email
                    </span>
                  </li>
                </ul>
              </div>
              {/* {onGoToProducts && (
                <Button onClick={onGoToProducts} className="w-full" size="lg">
                  Continuar comprando
                </Button>
              )} */}
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
                    <span>
                      Verifique os dados do pagamento e tente novamente
                    </span>
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
              {/* {onTryAgain && (
                <Button
                  onClick={onTryAgain}
                  variant="destructive"
                  className="w-full"
                  size="lg"
                >
                  Tentar novamente
                </Button>
              )} */}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const getPageTitle = () => {
    switch (status) {
      case "pago":
        return "Pagamento Confirmado";
      case "falhado":
        return "Pagamento Falhou";
      case "expirado":
        return "Pedido Expirou";
      case "pendente":
        return "Aguardando Pagamento";
      default:
        return "Resultado do Pedido";
    }
  };

  const getPageDescription = () => {
    switch (status) {
      case "pago":
        return "Seu pagamento foi processado com sucesso";
      case "falhado":
        return "Não foi possível processar seu pagamento";
      case "expirado":
        return "O tempo limite para pagamento foi excedido";
      case "pendente":
        return "Seu pedido está aguardando confirmação de pagamento";
      default:
        return "Status do seu pedido";
    }
  };

  return (
    <div>
      <ActionHeader
        title={"Status do Pedido"}
        description={getPageDescription()}
        textButton="Voltar ao checkout"
      />
      {renderResult()}
    </div>
  );
}
