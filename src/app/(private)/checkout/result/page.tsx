import { Order } from "@/features/checkout/result/page";
import { Suspense } from "react";

const OrderPage = () => {
  return (
    <Suspense>
      <Order />
    </Suspense>
  );
};

export default OrderPage;
