import { STEPS } from "@/constants/checkout/steps-checkout-form";

import { IItemCartDetailed, IItemCartOrder } from "@/@types/cart/ICart";
import { CreateOrder } from "@/@types/order/IOrder";
import { useCreateOrder } from "@/hooks/payment/create/use-create-order";
import { useCartStore } from "@/stores/use-cart-store";

import { useAuthStore } from "@/stores/use-auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import {
  MultiStepForm,
  multiStepCheckoutSchema,
} from "../_zod/multi-step-checkout-schema";

export const useMultiStepCheckoutForm = () => {
  const { currentUser: user } = useAuthStore();
  const [step, setStep] = useState<number>(0);
  const { getUserCart } = useCartStore();
  const { mutateAsync: createPayment, isPending: isCreatingOrder } =
    useCreateOrder();

  const form = useForm<MultiStepForm>({
    resolver: zodResolver(multiStepCheckoutSchema) as Resolver<MultiStepForm>,
    defaultValues: {
      shippingSchema: {
        id: user?.id ?? "",
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      methodPaymentSchema: {
        paymentMethod: undefined,
        cardName: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cardCVC: "",
        parcels: undefined,
      },
      orderReviewSchema: {
        agreeToTerms: false,
      },
    },
  });

  const CurrentComponentStep = STEPS[step].form;

  const incrementStep = () => setStep((prev) => prev + 1);
  const decrementStep = () => setStep((prev) => prev - 1);

  const nextStep = async () => {
    const isValid: boolean = await form.trigger(STEPS[step].field);
    if (!isValid) return;

    if (step === STEPS.length - 1) {
      form.handleSubmit(onSubmit)();
      return;
    }
    incrementStep();
  };

  const prevStep = () => {
    if (step === 0) return;
    decrementStep();
  };

  const onSubmit = (data: MultiStepForm) => {
    const items: IItemCartOrder[] = getUserCart().map(
      (item: IItemCartDetailed): IItemCartOrder => ({
        product_id: item.productId,
        quantity: item.quantity,
      })
    );

    const orderData: CreateOrder = {
      shipping: data.shippingSchema,
      methodPayment: data.methodPaymentSchema,
      items,
    };
    createPayment(orderData);
  };

  return {
    isCreatingOrder,
    step,
    form,
    CurrentComponentStep,
    nextStep,
    prevStep,
    onSubmit,
  };
};
