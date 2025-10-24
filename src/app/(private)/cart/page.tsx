import { ActionHeader } from "@/components/@shared/action-header/action-header";
import { CartList } from "@/components/cards/cart/cart-list";
import { SummaryCard } from "@/components/cards/summary-card/summary-card";

const CartPage = () => {
  return (
    <div>
      <ActionHeader
        title="Carrinho"
        description="Revise os itens do seu carrinho antes de finalizar a compra"
        textButton="Voltar para a loja"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CartList />
        </div>
        <div>
          <SummaryCard enabledButton />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
