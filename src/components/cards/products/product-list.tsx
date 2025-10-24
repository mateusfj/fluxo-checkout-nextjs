import { ErrorFallback } from "@/components/@shared/ErrorFallback/ErrorFallback";
import { ProductListSkeleton } from "@/components/skeletons/product-skeleton/product-list-skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useGetAllProducts } from "@/hooks/products/useGet/useGetAllProducts";
import { Folder } from "lucide-react";
import { ProductCard } from "./product-card";

export const ProductList = () => {
  const {
    data: productsResult,
    error: isErrorProducts,
    isLoading: isLoadingProducts,
  } = useGetAllProducts();

  if (isLoadingProducts) {
    return <ProductListSkeleton />;
  }

  if (isErrorProducts) {
    return (
      <div className="flex justify-center items-center">
        <ErrorFallback invalidateQuery={["products"]} />
      </div>
    );
  }

  if (productsResult && productsResult.data.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder />
          </EmptyMedia>
          <EmptyTitle>Nenhum Produto Encontrado</EmptyTitle>
          <EmptyDescription>
            Parece que não há produtos disponíveis no momento.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productsResult?.data.map((product) => (
        <ProductCard
          key={product.id}
          description={product.description}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          id={product.id}
        />
      ))}
    </div>
  );
};
