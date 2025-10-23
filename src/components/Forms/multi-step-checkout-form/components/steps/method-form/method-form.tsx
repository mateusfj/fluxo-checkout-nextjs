import { CustomSelect } from "@/components/custom-components/custom-select";
import { CustomTextInput } from "@/components/custom-components/custom-text-input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { useFormContext } from "react-hook-form";

const MethodForm = () => {
  const { register, watch, setValue } = useFormContext();

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Label className="text-base font-medium">
          Escolha a forma de pagamento
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            type="button"
            {...register("paymentMethod")}
            onClick={() => setValue("paymentMethod", "card")}
            className={cn(
              "flex items-center gap-3 p-4 border-2 rounded-ele transition-colors text-left",
              watch("paymentMethod") === "card"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
          >
            <CreditCard className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium">Cartão de Crédito/Débito</div>
              <div className="text-xs text-muted-foreground">
                Visa, Mastercard, Amex
              </div>
            </div>
          </button>

          <button
            type="button"
            {...register("paymentMethod")}
            onClick={() => setValue("paymentMethod", "pix")}
            className={cn(
              "flex items-center gap-3 p-4 border-2 rounded-ele transition-colors text-left",
              watch("paymentMethod") === "pix"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
          >
            <Wallet className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium">Pix</div>
              <div className="text-xs text-muted-foreground">
                Pagamento Seguro via Pix
              </div>
            </div>
          </button>

          <button
            type="button"
            {...register("paymentMethod")}
            onClick={() => setValue("paymentMethod", "boleto")}
            className={cn(
              "flex items-center gap-3 p-4 border-2 rounded-ele transition-colors text-left",
              watch("paymentMethod") === "boleto"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
          >
            <Smartphone className="h-5 w-5 text-gray-800" />
            <div>
              <div className="font-medium">Boleto</div>
              <div className="text-xs text-muted-foreground">
                Pagamento Seguro via Boleto
              </div>
            </div>
          </button>
        </div>
      </div>

      {watch("paymentMethod") === "card" && (
        <div className="flex flex-col gap-4 pt-6">
          <CustomTextInput name="nameCard" register={register} />
          <CustomTextInput name="cardNumber" register={register} />

          <div className="grid grid-cols-3 gap-4">
            <CustomSelect
              name="parcels"
              register={register}
              options={[
                { label: "1x sem juros", value: "1" },
                { label: "2x sem juros", value: "2" },
                { label: "3x sem juros", value: "3" },
                { label: "4x sem juros", value: "4" },
                { label: "5x sem juros", value: "5" },
                { label: "6x sem juros", value: "6" },
              ]}
            />

            <CustomSelect
              name="expiryMonth"
              register={register}
              options={[
                { label: "Janeiro", value: "01" },
                { label: "Fevereiro", value: "02" },
                { label: "Março", value: "03" },
                { label: "Abril", value: "04" },
                { label: "Maio", value: "05" },
                { label: "Junho", value: "06" },
                { label: "Julho", value: "07" },
                { label: "Agosto", value: "08" },
                { label: "Setembro", value: "09" },
                { label: "Outubro", value: "10" },
                { label: "Novembro", value: "11" },
                { label: "Dezembro", value: "12" },
              ]}
            />

            <CustomSelect
              name="expiryYear"
              register={register}
              options={Array.from({ length: 10 }, (_, i) => ({
                label: String(2024 + i),
                value: String(2024 + i),
              }))}
            />
            <CustomTextInput name="cvv" register={register} />
          </div>
        </div>
      )}

      {/* PayPal Info */}
      {watch("paymentMethod") === "pix" && (
        <div className="pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-ele p-4">
            <div className="flex items-start gap-3">
              <Wallet className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">PayPal Payment</h4>
                <p className="text-sm text-blue-700 mt-1">
                  You'll be redirected to PayPal to complete your payment
                  securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apple Pay Info */}
      {watch("paymentMethod") === "boleto" && (
        <div className="pt-6">
          <div className="bg-gray-50 border border-gray-200 rounded-ele p-4">
            <div className="flex items-start gap-3">
              <Smartphone className="h-5 w-5 text-gray-800 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Apple Pay</h4>
                <p className="text-sm text-gray-700 mt-1">
                  Use Touch ID or Face ID to pay with your default card.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { MethodForm };
