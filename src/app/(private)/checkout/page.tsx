"use client";

import { CheckoutSummaryCard } from "@/components/checkout/checkout-sumary-card";
import { MultiStepCheckoutForm } from "@/components/Forms/multi-step-checkout-form/multi-step-checkout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, CreditCard, Truck } from "lucide-react";
import { useEffect, useState } from "react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  discount?: number;
}

interface CheckoutSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  nameOnCard: string;
}

export default function Checkout() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps = ["Shipping Information", "Payment Information", "Review Order"];

  const [selectedPaymentType, setSelectedPaymentType] =
    useState<string>("card");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const sampleOrderItems: OrderItem[] = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quantity: 2,
      discount: 31,
    },
    {
      id: "2",
      name: "Minimalist Desk Lamp",
      price: 45.99,
      image:
        "https://images.unsplash.com/photo-1617363020293-62faac14783d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quantity: 1,
    },
    {
      id: "3",
      name: "Organic Coffee Beans",
      price: 24.99,
      originalPrice: 29.99,
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
      quantity: 3,
      discount: 17,
    },
  ];

  useEffect(() => {
    const loadCheckout = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setOrderItems(sampleOrderItems);
      setIsLoading(false);
    };

    loadCheckout();
  }, []);

  const CheckoutSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col gap-4">
            <Skeleton className="h-6 w-24" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full mx-auto p-6 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-32" />
        </div>
        <CheckoutSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4 flex-col">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Cart
          </Button>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Checkout
            </h1>
            <p className="text-muted-foreground text-sm">
              Complete your purchase securely
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-4 sm:gap-6 py-4">
        {[
          { step: 1, label: "Shipping", icon: Truck },
          { step: 2, label: "Payment", icon: CreditCard },
          { step: 3, label: "Review", icon: Check },
        ].map(({ step, label, icon: Icon }, index) => (
          <div key={step} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                  currentStep >= step
                    ? "bg-primary border-primary text-white"
                    : "border-border text-muted-foreground"
                )}
              >
                {currentStep > step ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium hidden sm:block",
                  currentStep >= step
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {index < 2 && (
              <div
                className={cn(
                  "w-8 h-0.5",
                  currentStep > step ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <MultiStepCheckoutForm />
          {/* {currentStep === 3 && (
            <div>
  
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Shipping Address</h3>
                <div className="text-sm text-muted-foreground p-3 bg-accent rounded-ele">
                  <p>
                    {addressSchema.firstName} {addressSchema.lastName}
                  </p>
                  <p>{addressSchema.address}</p>
                  <p>
                    {addressSchema.city}, {addressSchema.state}{" "}
                    {addressSchema.zipCode}
                  </p>
                  <p>{addressSchema.email}</p>
                </div>
              </div>{" "}
     
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Payment Method</h3>
                <div className="text-sm text-muted-foreground p-3 bg-accent rounded-ele">
                  {selectedPaymentType === "card" && (
                    <>
                      <p>**** **** **** {paymentMethod.cardNumber.slice(-4)}</p>
                      <p>{paymentMethod.nameOnCard}</p>
                    </>
                  )}
                  {selectedPaymentType === "paypal" && (
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-blue-600" />
                      <span>PayPal</span>
                    </div>
                  )}
                  {selectedPaymentType === "apple-pay" && (
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-gray-800" />
                      <span>Apple Pay</span>
                    </div>
                  )}
                  {selectedPaymentType === "google-pay" && (
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-green-600" />
                      <span>Google Pay</span>
                    </div>
                  )}
                  {selectedPaymentType === "bank-transfer" && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-blue-800" />
                      <span>Bank Transfer</span>
                    </div>
                  )}
                  {selectedPaymentType === "bnpl" && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>
                        Buy Now Pay Later (4 payments of ${(10 / 4).toFixed(2)})
                      </span>
                    </div>
                  )}
                </div>
              </div>{" "}
       
              <div className="flex items-start gap-2 border-t pt-4">
                <Checkbox
                  id="agreeTerms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) =>
                    setAgreeToTerms(checked === true)
                  }
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
          )} */}
        </div>
        <div className="flex flex-col">
          <CheckoutSummaryCard />
        </div>
      </div>
    </div>
  );
}

export { Checkout };
