import { EPaymentMethod } from "@/constants/enum/payment-method";
import { z } from "zod";

export const methodPaymentSchema = z
  .object({
    paymentMethod: z.nativeEnum(EPaymentMethod),
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    expiryMonth: z.string().optional(),
    expiryYear: z.string().optional(),
    cardCVC: z.string().optional(),
    parcels: z.coerce.number().min(1).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === EPaymentMethod.CREDIT) {
      if (!data.cardName || data.cardName.trim().length < 1) {
        ctx.addIssue({
          path: ["cardName"],
          message: "Campo é obrigatório",
          code: z.ZodIssueCode.custom,
        });
      }

      const digits = data.cardNumber?.replace(/\D/g, "") ?? "";
      if (digits.length < 1) {
        ctx.addIssue({
          path: ["cardNumber"],
          message: "Campo é obrigatório",
          code: z.ZodIssueCode.custom,
        });
      }

      if (digits.length !== 16) {
        ctx.addIssue({
          path: ["cardNumber"],
          message: "Número do cartão deve ter 16 dígitos",
          code: z.ZodIssueCode.custom,
        });
      }

      const month = data.expiryMonth?.trim();
      if (
        !month ||
        !/^\d{2}$/.test(month) ||
        Number(month) < 1 ||
        Number(month) > 12
      ) {
        ctx.addIssue({
          path: ["expiryMonth"],
          message: "Selecione o mês",
          code: z.ZodIssueCode.custom,
        });
      }

      const year = data.expiryYear?.trim();
      const currentYear = new Date().getFullYear();
      if (!year || !/^\d{4}$/.test(year) || Number(year) < currentYear) {
        ctx.addIssue({
          path: ["expiryYear"],
          message: "Selecione o ano",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.cardCVC || !/^\d{3,4}$/.test(data.cardCVC)) {
        ctx.addIssue({
          path: ["cardCVC"],
          message: "CVC deve ter 3 ou 4 dígitos numéricos",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.parcels || data.parcels < 1) {
        ctx.addIssue({
          path: ["parcels"],
          message: "Selecione o número de parcelas",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
