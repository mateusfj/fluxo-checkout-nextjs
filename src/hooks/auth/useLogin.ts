import { useAuthStore } from "@/stores/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface useLoginProps {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (input: useLoginProps) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const user = await login({
        email: input.email,
        password: input.password,
      });

      return user;
    },

    onMutate() {
      const toastId = toast.loading("Fazendo login...");
      return { toastId };
    },

    onError(error, _, context) {
      toast.error(error.message);
      toast.dismiss(context?.toastId);
    },

    onSuccess(_, __, context) {
      toast.success("Login realizado com sucesso!");
      toast.dismiss(context?.toastId);
    },

    onSettled(_, __, ___, context) {
      toast.dismiss(context?.toastId);
    },
  });
};
