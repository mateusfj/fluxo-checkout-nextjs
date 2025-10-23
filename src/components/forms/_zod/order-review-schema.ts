import z from "zod";

export const orderReviewSchema = z.object({
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms of service",
  }),
});

export type OrderReviewForm = z.infer<typeof orderReviewSchema>;
