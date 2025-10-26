"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLoginForm } from "./use-login-form";
import { CustomTextInput } from "@/components/custom-form-components/custom-text-input";
import { CustomPasswordInput } from "@/components/custom-form-components/custom-password-input";

const LoginForm = () => {
  const { form, onSubmit } = useLoginForm();

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
