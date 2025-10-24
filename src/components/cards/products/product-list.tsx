import { useGetAllProducts } from "@/hooks/products/useGet/useGetAllProducts";
import { ProductCard } from "./product-card";

export const ProductList = () => {
  const {
    data: productsResult,
    error: isErrorProducts,
    isLoading: isLoadingProducts,
  } = useGetAllProducts();

  if (isLoadingProducts) {
    return <p>Loading products...</p>;
  }

  if (isErrorProducts) {
    return <p>Error loading products.</p>;
  }

  if (productsResult && productsResult.data.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div>
      {productsResult && productsResult.data.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productsResult.data.map((product) => (
            <ProductCard
              key={product.id}
              description={product.description}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              id={product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
