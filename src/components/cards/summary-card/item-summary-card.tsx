import { IItemCartDetailed } from "@/@types/cart/ICart";
import { Badge } from "@/components/ui/badge";
import { formatToBRLMask } from "@/utils/functions/masks/moneyMask";

interface ItemSummaryCardProps {
  item: IItemCartDetailed;
}
const ItemSummaryCard = ({ item }: ItemSummaryCardProps) => {
  return (
    <div key={item.id} className="flex gap-3">
      <div className="relative w-12 h-12 flex-shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
        <Badge className="absolute -top-1 -right-1 text-xs min-w-5 h-5 flex items-center justify-center">
          {item.quantity}
        </Badge>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {formatToBRLMask(item.price)}
          </span>
        </div>
      </div>
      <div className="text-sm font-semibold">
        {formatToBRLMask(item.price * item.quantity)}
      </div>
    </div>
  );
};

export { ItemSummaryCard };
