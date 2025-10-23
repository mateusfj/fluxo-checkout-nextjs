import { z } from "zod";
import { methodPaymentSchema } from "./method-payment-schema";
import { shippingSchema } from "./shipping-schema";

export const multiStepCheckoutSchema = z.object({
  shippingSchema,
  methodPaymentSchema,
});

export type MultiStepForm = z.infer<typeof multiStepCheckoutSchema>;
