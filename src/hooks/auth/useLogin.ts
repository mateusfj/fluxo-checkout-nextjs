import { AuthContext } from "@/utils/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";

interface useLoginProps {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { setUser } = useContext(AuthContext);
  return useMutation({
    mutationFn: async (input: useLoginProps) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao fazer login");
      }

      const body = await response.json();

      return body;
    },

    onMutate() {
      const toastId = toast.loading("Fazendo login...");
      return { toastId };
    },

    onError(error, _, context) {
      toast.error(error.message);
      toast.dismiss(context?.toastId);
    },

    onSuccess(data, __, context) {
      setUser(data.user);
      toast.success("Login realizado com sucesso!");
      toast.dismiss(context?.toastId);
    },

    onSettled(_, __, ___, context) {
      toast.dismiss(context?.toastId);
    },
  });
};
