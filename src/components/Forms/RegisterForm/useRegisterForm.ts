import { useCreateUser } from "@/hooks/auth/useCreateUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { registerSchema } from "../_zod/register-schema";

export const useRegisterForm = () => {
  const { push } = useRouter();
  const { mutateAsync: createUser } = useCreateUser();

  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    await createUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    push("/login");
  }

  return { form, onSubmit };
};
