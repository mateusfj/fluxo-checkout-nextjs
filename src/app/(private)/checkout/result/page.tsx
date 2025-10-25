"use client";

import { ActionHeader } from "@/components/@shared/action-header/action-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Eye,
  Home,
  RotateCcw,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ResultadoCheckoutPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");
  const message = searchParams.get("message");

  const getStatusInfo = () => {
    switch (status) {
      case "pago":
        return {
          title: "Pagamento Aprovado!",
          description: "Seu pedido foi confirmado com sucesso",
          icon: CheckCircle,
          color: "text-green-700",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          iconColor: "text-green-700",
        };
      case "falhado":
        return {
          title: "Pagamento Falhou",
          description: "Houve um problema ao processar seu pagamento",
          icon: XCircle,
          color: "text-red-700",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-700",
        };
      case "expirado":
        return {
          title: "Pedido Expirou",
          description: "O tempo para pagamento acabou",
          icon: Clock,
          color: "text-orange-700",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          iconColor: "text-orange-700",
        };
      case "pendente":
        return {
          title: "Aguardando Pagamento",
          description: "Seu pedido ainda está aguardando o pagamento",
          icon: Clock,
          color: "text-blue-700",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-700",
        };
      default:
        return {
          title: "Erro Desconhecido",
          description: "Ocorreu um erro inesperado",
          icon: XCircle,
          color: "text-red-700",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-700",
        };
    }
  };

  const renderResult = () => {
    const statusInfo = getStatusInfo();
    const IconComponent = statusInfo.icon;

    return (
      <Card
        className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2`}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-full ${statusInfo.bgColor} ${statusInfo.borderColor} border`}
            >
              <IconComponent className={`h-6 w-6 ${statusInfo.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold ${statusInfo.color} mb-2`}>
                {statusInfo.title}
              </h3>
              <p className={`${statusInfo.color} mb-4`}>
                {status === "pago" && (
                  <>
                    Seu pedido{" "}
                    <strong className="font-semibold">#{orderId}</strong> foi
                    confirmado com sucesso. Em breve você receberá atualizações
                    sobre a entrega.
                  </>
                )}
                {status === "falhado" && (
                  <>
                    Houve um problema ao processar seu pagamento.
                    {message && (
                      <span className="block mt-2 text-sm">
                        <strong>Motivo:</strong> {message}
                      </span>
                    )}
                  </>
                )}
                {status === "expirado" && (
                  <>
                    O tempo para pagamento do pedido{" "}
                    <strong className="font-semibold">#{orderId}</strong>{" "}
                    acabou.
                  </>
                )}
                {status === "pendente" && (
                  <>
                    Seu pedido{" "}
                    <strong className="font-semibold">#{orderId}</strong> ainda
                    está aguardando o pagamento (Boleto ou Pix).
                  </>
                )}
                {!status && (
                  <>Ocorreu um erro inesperado no status do seu pedido.</>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {status === "pago" && (
                  <Button asChild size="lg" className="flex items-center gap-2">
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      Voltar para o início
                    </Link>
                  </Button>
                )}

                {status === "falhado" && (
                  <Button asChild size="lg" className="flex items-center gap-2">
                    <Link href="/checkout">
                      <RotateCcw className="h-4 w-4" />
                      Tentar Novamente
                    </Link>
                  </Button>
                )}

                {status === "expirado" && (
                  <Button asChild size="lg" className="flex items-center gap-2">
                    <Link href="/checkout">
                      <RotateCcw className="h-4 w-4" />
                      Gerar um novo pedido
                    </Link>
                  </Button>
                )}

                {status === "pendente" && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Link href={`/checkout/pagar/pix?orderId=${orderId}`}>
                      <Eye className="h-4 w-4" />
                      Ver Pagamento
                    </Link>
                  </Button>
                )}

                {!status && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      Voltar para o início
                    </Link>
                  </Button>
                )}

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    Ir para a loja
                  </Link>
                </Button>
              </div>
            </div>
          </div>
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
        title={getPageTitle()}
        description={getPageDescription()}
        textButton="Voltar ao checkout"
      />
      {renderResult()}
    </div>
  );
}
