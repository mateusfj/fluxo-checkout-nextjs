"use client";

import { registerSchema } from "@/components/auth/Forms/_zod/RegisterSchema";
import { CustomPasswordInput } from "@/components/custom-components/custom-password-input";
import { CustomTextInput } from "@/components/custom-components/custom-test-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      nome: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log("Register data:", values);
  }

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <CustomTextInput
          control={form.control}
          name="nome"
          label="Nome"
          placeholder="Digite seu nome completo"
        />

        <CustomTextInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Digite seu email"
        />

        <CustomPasswordInput control={form.control} name="password" />

        <CustomPasswordInput
          control={form.control}
          name="confirmPassword"
          label="Confirmar Senha"
          placeholder="Confirme sua senha"
        />

        <Button
          className="cursor-pointer w-full"
          onClick={form.handleSubmit(onSubmit)}
          type="button"
        >
          Registrar
        </Button>
      </div>
    </Form>
  );
};

export { RegisterForm };
