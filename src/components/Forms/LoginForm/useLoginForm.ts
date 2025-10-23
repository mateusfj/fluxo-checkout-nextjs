import { useLogin } from "@/hooks/auth/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { loginSchema } from "../_zod/login-shema";

export const useLoginForm = () => {
  const { push } = useRouter();
  const { mutateAsync: login } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await login({ email: values.email, password: values.password });
    push("/");
  }

  return { form, onSubmit };
};
