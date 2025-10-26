import { Card } from "@/components/ui/card";
import { Receipt } from "lucide-react";
import { ReactNode } from "react";

interface PaymentInfoCardProps {
  title: string;
  message: string;
  icon?: ReactNode;
  className?: string;
}

const PaymentInfoCard = ({
  title,
  message,
  icon = <Receipt className="h-5 w-5 mt-0.5" />,
  className = "",
}: PaymentInfoCardProps) => {
  return (
    <div className={`pt-6 border-t ${className}`}>
      <Card className="p-4 bg-muted">
        <div className="flex items-start gap-3">
          {icon}
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm mt-1">{message}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export { PaymentInfoCard };
