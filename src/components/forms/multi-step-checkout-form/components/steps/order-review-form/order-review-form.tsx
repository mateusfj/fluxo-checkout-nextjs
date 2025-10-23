import { MultiStepForm } from "@/components/forms/_zod/multi-step-checkout-schema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { EPaymentMethod } from "@/constants/enum/payment-method";
import { Label } from "@radix-ui/react-label";
import { Smartphone, Wallet } from "lucide-react";
import { useFormContext } from "react-hook-form";

const OrderReview = () => {
  const { watch, control } = useFormContext<MultiStepForm>();
  const addressSchema = watch("shippingSchema");
  const methodSchema = watch("methodPaymentSchema");

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Shipping Address</h3>
        <div className="text-sm text-muted-foreground p-3 bg-accent rounded-ele">
          <p>{addressSchema.name}</p>
          <p>{addressSchema.street}</p>
          <p>
            {addressSchema.city}, {addressSchema.state} {addressSchema.zipCode}
          </p>
          <p>{addressSchema.email}</p>
        </div>
      </div>{" "}
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Payment Method</h3>
        <div className="text-sm text-muted-foreground p-3 bg-accent rounded-ele">
          {methodSchema.paymentMethod === EPaymentMethod.CREDIT && (
            <>
              <p>**** **** **** {methodSchema.cardNumber?.slice(-4)}</p>
              <p>{methodSchema.cardName}</p>
            </>
          )}
          {methodSchema.paymentMethod === EPaymentMethod.PIX && (
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-blue-600" />
              <span>PayPal</span>
            </div>
          )}
          {methodSchema.paymentMethod === EPaymentMethod.BOLETO && (
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-gray-800" />
              <span>Apple Pay</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start gap-2 border-t pt-4">
        <FormField
          control={control}
          name="orderReviewSchema.agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  id="agreeTerms"
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
          I agree to the{" "}
          <Button variant="link" className="p-0 h-auto text-sm">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="p-0 h-auto text-sm">
            Privacy Policy
          </Button>
        </Label>
      </div>
    </div>
  );
};

export { OrderReview };
