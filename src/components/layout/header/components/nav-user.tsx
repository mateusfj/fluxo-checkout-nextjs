"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/utils/providers/AuthProvider";
import { ChevronDown, LogOut } from "lucide-react";
import { useContext } from "react";

export function NavUser() {
  const { user } = useContext(AuthContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
          <span className="text-muted-foreground truncate text-xs">
            {user?.name}
          </span>
          <div className="flex items-center gap-1">
            <span className="truncate font-medium">Minha Conta</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" min-w-50 rounded-lg"
        side={"top"}
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal"></DropdownMenuLabel>
        <DropdownMenuItem>
          Sair
          <DropdownMenuShortcut>
            <LogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
