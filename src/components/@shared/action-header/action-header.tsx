"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface ActionHeaderProps {
  description: string;

  title: string;
  textButton?: string;
}

const ActionHeader = ({
  description,
  title,
  textButton = "Voltar",
}: ActionHeaderProps) => {
  return (
    <div className="flex items-center">
      <div className="flex items-start gap-4 flex-col">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.history.back()}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          {textButton}
        </Button>
        <div className="flex mb-6 justify-between items-center md:flex-nowrap flex-wrap gap-2 ">
          <div className="w-full md:w-auto">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ActionHeader };
