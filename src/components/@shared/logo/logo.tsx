import { Package } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Package className="h-6 w-6 text-primary-foreground" />
      <span className="text-xl font-bold text-primary-foreground">Logo</span>
    </Link>
  );
};

export { Logo };
