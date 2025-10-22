import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { CartDrawerBody } from "./cart-drawer-body";
import { CartDrawerFooter } from "./cart-drawer-footer";

export const CartDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Carrinho de Compras
          </SheetTitle>
          <SheetDescription>
            Revise seus itens antes de finalizar a compra.
          </SheetDescription>
        </SheetHeader>
        <CartDrawerBody />
        <SheetFooter>
          <CartDrawerFooter />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
