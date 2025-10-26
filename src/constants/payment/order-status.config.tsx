"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  XCircle,
} from "lucide-react";
import { EStatusPayment } from "@/constants/enum/status-payment";
import { ElementType } from "react";

export interface StatusInfo {
  title: string;
  description: string;
  color: string;
  Icon: ElementType;
}

const DefaultIcon = () => <AlertCircle className="h-16 w-16" />;

export const STATUS_CONFIG: Record<string, StatusInfo> = {
  [EStatusPayment.PAID]: {
    title: "Pagamento confirmado!",
    description:
      "Seu pedido foi confirmado com sucesso. Em breve você receberá um email com os detalhes.",
    color: "text-green-600",
    Icon: () => <CheckCircle2 className="h-16 w-16 text-green-600" />,
  },
  [EStatusPayment.PROCESSING]: {
    title: "Processando pagamento",
    description:
      "Seu pagamento está sendo processado. Isso pode levar alguns minutos.",
    color: "text-primary",
    Icon: () => <Loader2 className="h-16 w-16 animate-spin text-primary" />,
  },
  [EStatusPayment.FAILED]: {
    title: "Pagamento recusado",
    description:
      "Não foi possível processar seu pagamento. Tente novamente ou escolha outro método.",
    color: "text-destructive",
    Icon: () => <XCircle className="h-16 w-16 text-destructive" />,
  },
  [EStatusPayment.EXPIRED]: {
    title: "Pagamento expirado",
    description: "O tempo para pagamento expirou. Por favor, tente novamente.",
    color: "text-destructive",
    Icon: () => <Clock className="h-16 w-16 text-destructive" />,
  },
  [EStatusPayment.PENDING]: {
    title: "Aguardando pagamento",
    description: "Seu pedido foi criado e está aguardando o pagamento.",
    color: "text-yellow-600",
    Icon: () => <Clock className="h-16 w-16 text-yellow-600" />,
  },
  default: {
    title: "Status desconhecido",
    description: "Entre em contato com o suporte.",
    color: "text-muted-foreground",
    Icon: DefaultIcon,
  },
};
