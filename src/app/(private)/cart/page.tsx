import { ActionHeader } from "@/components/@shared/action-header/action-header";
import { CartListWithSummaryCard } from "@/components/cards/cart/cart-list-with-sumary-card";

const CartPage = () => {
  return (
    <div>
      <ActionHeader
        title="Carrinho"
        description="Revise os itens do seu carrinho antes de finalizar a compra"
        textButton="Voltar para a loja"
      />
      <CartListWithSummaryCard />
    </div>
  );
};

export default CartPage;
