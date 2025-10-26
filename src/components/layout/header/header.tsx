import { Logo } from "@/components/@shared/logo/logo";
import { Separator } from "@/components/ui/separator";
import { CartButton } from "./components/cart-button";
import { LogoutButton } from "./components/logout-button";
import { NavUser } from "./components/nav-user";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto p-4 flex items-center justify-between py-6">
        <Logo />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div className="hidden md:flex items-center gap-4 h-5">
            <NavUser />
            <Separator orientation="vertical" />
          </div>
          <CartButton />
          <div className="flex md:hidden items-center gap-4 h-5">
            <Separator orientation="vertical" />
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
