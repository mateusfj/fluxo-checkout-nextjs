"use client";

import { useGetAllItemsCartByUser } from "@/hooks/cart/useGet/useGetAllCartByUser";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SheetClose } from "../ui/sheet";

export const CartDrawerFooter = () => {
  const { data: itemsCartResultByUser } = useGetAllItemsCartByUser();
  const { push } = useRouter();

  const total =
    itemsCartResultByUser?.data.reduce((acc, item) => acc + item.subtotal, 0) ||
    0;

  return (
    <>
      <SheetClose asChild>
        <Button variant="outline" className="w-full">
          Continue comprando
        </Button>
      </SheetClose>
      <Button
        className="w-full"
        disabled={itemsCartResultByUser?.data.length === 0}
        onClick={() => push("/checkout")}
      >
        {`Comprar ${total ? `(R$ ${total.toFixed(2)})` : ""}`}
      </Button>
    </>
  );
};
