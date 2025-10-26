import { IProduct } from "@/@types/products/IProduct";
import { IResponseList } from "@/@types/services/IResponse";
import { getAllProducts } from "@/@mock/poducts-mock-api";
import { useQuery } from "@tanstack/react-query";

const useGetAllProducts = () => {
  return useQuery({
    queryFn: async (): Promise<IResponseList<IProduct>> => {
      const products = await getAllProducts();

      return { data: products };
    },
    queryKey: ["products"],
    refetchOnWindowFocus: false,
  });
};

export { useGetAllProducts };
