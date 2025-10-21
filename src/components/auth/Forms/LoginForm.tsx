"use client";

import { loginSchema } from "@/components/auth/Forms/_zod/LoginShema";
import { CustomPasswordInput } from "@/components/custom-components/custom-password-input";
import { CustomTextInput } from "@/components/custom-components/custom-test-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log("Login data:", values);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <CustomTextInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Digite seu email"
          />
          <CustomPasswordInput control={form.control} name="password" />
          <Button className="w-full cursor-pointer" type="submit">
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { LoginForm };
