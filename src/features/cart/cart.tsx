import { ActionHeader } from "@/components/@shared/action-header/action-header";
import { CartListWithSummaryCard } from "@/features/cart/cards/cart-list-with-sumary-card";

const Cart = () => {
  return (
    <div>
      <ActionHeader
        title="Carrinho"
        description="Revise os itens do seu carrinho antes de finalizar a compra"
        textButton="Voltar para a loja"
        href="/"
      />
      <CartListWithSummaryCard />
    </div>
  );
};

export { Cart };
