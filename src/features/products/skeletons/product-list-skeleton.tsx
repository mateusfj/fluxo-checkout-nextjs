import { ProductCardSkeleton } from "./product-skeleton";

const ProductListSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
export { ProductListSkeleton };
