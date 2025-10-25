import { useLogin } from "@/hooks/auth/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "../_zod/login-schema";

export const useLoginForm = () => {
  const { push } = useRouter();
  const { mutateAsync: login } = useLogin();
  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginForm) {
    await login({ email: values.email, password: values.password });
    push("/");
  }

  return { form, onSubmit };
};
