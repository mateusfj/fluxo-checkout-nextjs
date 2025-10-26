import { Payment } from "@/features/checkout/payment/payment";
import { Suspense } from "react";

const PaymentPage = async ({
  params,
}: {
  params: Promise<{ method: string }>;
}) => {
  const { method } = await params;

  return (
    <Suspense>
      <Payment method={method} />
    </Suspense>
  );
};

export default PaymentPage;
