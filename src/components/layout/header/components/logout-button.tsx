"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/stores/use-auth-store";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const { logout } = useAuthStore();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Sair</p>
      </TooltipContent>
    </Tooltip>
  );
};
export { LogoutButton };
