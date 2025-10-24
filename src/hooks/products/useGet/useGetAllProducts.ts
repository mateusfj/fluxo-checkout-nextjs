import { IProduct } from "@/@types/products/IProduct";
import { IResponseList } from "@/@types/services/IResponse";
import { useQuery } from "@tanstack/react-query";

const useGetAllProducts = () => {
  return useQuery({
    queryFn: async (): Promise<IResponseList<IProduct>> => {
      const response = await fetch("http://localhost:3001/products");
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const data = await response.json();

      return { data };
    },
    queryKey: ["products"],
    refetchOnWindowFocus: false,
  });
};

export { useGetAllProducts };
