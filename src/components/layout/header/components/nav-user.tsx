"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/use-auth-store";

import { ChevronDown, LogOut } from "lucide-react";

export function NavUser() {
  const { getCurrentUser, logout } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
          <span className="text-primary-foreground truncate text-xs">
            {getCurrentUser()?.name}
          </span>
          <div className="flex items-center gap-1">
            <span className="truncate font-medium text-primary-foreground">
              Minha Conta
            </span>
            <ChevronDown className="h-4 w-4 text-primary-foreground" />
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
        <DropdownMenuItem onClick={logout}>
          Sair
          <DropdownMenuShortcut>
            <LogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
