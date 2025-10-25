import { Suspense } from "react";
import { PaymentMethod } from "./components/payment-method";

const Page = async ({ params }: { params: Promise<{ method: string }> }) => {
  const { method } = await params;

  return (
    <Suspense>
      <PaymentMethod method={method} />
    </Suspense>
  );
};

export default Page;
