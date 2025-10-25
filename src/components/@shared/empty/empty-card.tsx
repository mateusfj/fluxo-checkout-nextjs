import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface EmptyCardProps {
  buttonText?: string;
  onClick?: () => void;
  message: string;
}

const EmptyCard = ({ onClick, message, buttonText }: EmptyCardProps) => {
  return (
    <div className="text-center py-8">
      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500 mb-4">{message}</p>
      {buttonText && (
        <Button variant="outline" className="rounded-full" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export { EmptyCard };
