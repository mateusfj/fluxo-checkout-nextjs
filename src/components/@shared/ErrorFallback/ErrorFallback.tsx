import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

interface ErrorFallbackProps {
  invalidateQuery: string[];
  imageSrc?: string;
}

export const ErrorFallback = ({
  invalidateQuery,
  imageSrc = "/images/errors/error.webp",
}: ErrorFallbackProps) => {
  const queryClient = useQueryClient();

  const retryRequest = () => {
    queryClient.invalidateQueries({ queryKey: invalidateQuery });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-40 h-40 relative">
        <Image src={imageSrc} alt="Erro" fill className="object-contain" />
      </div>
      <h2 className="text-2xl font-bold text-primary">OPS! Algo deu errado!</h2>
      <p className="text-muted-foreground">
        Não foi possível carregar os dados. Por favor, tente novamente.
      </p>
      <Button onClick={retryRequest}>Tente novamente</Button>
    </div>
  );
};
