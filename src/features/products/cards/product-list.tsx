import { EmptyCard } from "@/components/@shared/empty/empty-card";
import { useGetAllProducts } from "@/hooks/products/get/use-get-all-products";
import { ProductCard } from "./product-card";
import { ProductListSkeleton } from "../skeletons/product-list-skeleton";
import { StatusCard } from "@/features/checkout/result/components/order-status-display/status-card";
import { AlertCircle } from "lucide-react";

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
      <StatusCard
        Icon={() => <AlertCircle className="h-16 w-16" />}
        color="text-destructive"
        description="Não foi possível carregar os dados dos produtos. Por favor, tente novamente."
        title="Erro ao carregar produtos"
        invalidateQuery={["products"]}
      />
    );
  }

  if (productsResult && productsResult.data.length === 0) {
    return <EmptyCard message="Não há produtos disponíveis no momento." />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
