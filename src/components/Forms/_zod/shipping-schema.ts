import { z } from "zod";

export const shippingSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
  phone: z.string().optional(),
  street: z.string().min(2, "Campo obrigatório"),
  city: z.string().min(2, "Campo obrigatório"),
  state: z.string().min(2, "Campo obrigatório"),
  zipCode: z.string().min(5, "Campo obrigatório"),
});
