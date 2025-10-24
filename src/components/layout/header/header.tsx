import { Logo } from "@/components/@shared/logo/logo";
import { Separator } from "@/components/ui/separator";
import { CartButton } from "./components/cart-button";
import { NavUser } from "./components/nav-user";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Logo />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <NavUser />
          <Separator orientation="vertical" />
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export { Header };
