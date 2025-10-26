"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ElementType } from "react";

interface StatusCardProps {
  title: string;
  description: string;
  color: string;
  Icon: ElementType;
  invalidateQuery?: string[];
  goToHome?: boolean;
}

export function StatusCard({
  title,
  description,
  color,
  Icon,
  goToHome,
  invalidateQuery,
}: StatusCardProps) {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className={cn("mb-4", color)}>
        <Icon />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md text-pretty">
        {description}
      </p>
      {invalidateQuery && (
        <Button
          className="mt-4 rounded-full"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: invalidateQuery })
          }
        >
          Recarregar
        </Button>
      )}
      {goToHome && (
        <Button className="mt-4 rounded-full" onClick={() => push("/")}>
          Voltar ao início
        </Button>
      )}
    </div>
  );
}
