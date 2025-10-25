import { EmptyCard } from "@/components/@shared/empty/empty-card";
import { ErrorFallback } from "@/components/@shared/ErrorFallback/ErrorFallback";
import { ProductListSkeleton } from "@/components/skeletons/product-skeleton/product-list-skeleton";
import { useGetAllProducts } from "@/hooks/products/useGet/useGetAllProducts";
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
    return <EmptyCard message="Não há produtos disponíveis no momento." />;
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
