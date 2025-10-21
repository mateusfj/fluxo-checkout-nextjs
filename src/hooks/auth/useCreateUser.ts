import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateUserProps {
  nome: string;
  email: string;
  password: string;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (newUser: CreateUserProps) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const user = await fetch(
        `http://localhost:3001/users?email=${newUser.email}`
      );

      const existUser = await user.json();

      if (existUser.length > 0) {
        throw new Error("Email já cadastrado");
      }

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Erro ao cadastrar usuário");
      }

      return response.json();
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
