import z from "zod";

export const methodPaymentSchema = z.object({
  paymentMethod: z.enum(["credit", "pix", "boleto"], {
    errorMap: () => ({ message: "Método de pagamento inválido" }),
  }),
  cardName: z
    .string()
    .min(2, "Nome no cartão deve ter pelo menos 2 caracteres")
    .optional(),
  cardNumber: z
    .string()
    .min(16, "Número do cartão deve ter pelo menos 16 caracteres")
    .optional(),
  cardExpiry: z
    .string()
    .min(5, "Data de validade deve ter pelo menos 5 caracteres")
    .optional(),
  cardCVC: z.string().min(3, "CVC deve ter pelo menos 3 caracteres").optional(),
  parcels: z
    .number()
    .min(1, "Número de parcelas deve ser pelo menos 1")
    .optional(),
});

export type MethodForm = z.infer<typeof methodPaymentSchema>;
