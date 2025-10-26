import { ICreateUser } from "@/@types/auth/IUser";
import { useAuthStore } from "@/stores/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateUser = () => {
  const { register } = useAuthStore();

  return useMutation({
    mutationFn: async (user: ICreateUser) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newUser = await register({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      return newUser;
    },

    onMutate() {
      const toastId = toast.loading("Cadastrando usuário...");
      return { toastId };
    },

    onError(error, _, context) {
      toast.error(error.message);
      toast.dismiss(context?.toastId);
    },

    onSuccess(_, __, context) {
      toast.success("Cadastro realizado com sucesso!");
      toast.dismiss(context?.toastId);
    },

    onSettled(_, __, ___, context) {
      toast.dismiss(context?.toastId);
    },
  });
};
