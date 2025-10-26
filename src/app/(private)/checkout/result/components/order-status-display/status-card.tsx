"use client";

import { cn } from "@/lib/utils";
import { ElementType } from "react";

interface StatusCardProps {
  title: string;
  description: string;
  color: string;
  Icon: ElementType;
}

export function StatusCard({
  title,
  description,
  color,
  Icon,
}: StatusCardProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className={cn("mb-4", color)}>
        <Icon />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md text-pretty">
        {description}
      </p>
    </div>
  );
}
