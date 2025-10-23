"use client";
import { CustomPasswordInput } from "@/components/custom-components/custom-password-input";
import { CustomTextInput } from "@/components/custom-components/custom-text-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useRegisterForm } from "./use-register-form";

const RegisterForm = () => {
  const { form, onSubmit } = useRegisterForm();

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <CustomTextInput
          control={form.control}
          name="name"
          label="Nome"
          placeholder="Digite seu nome completo"
        />

        <CustomTextInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Digite seu email"
          disabled={form.formState.isSubmitting}
        />

        <CustomPasswordInput
          control={form.control}
          name="password"
          disabled={form.formState.isSubmitting}
        />

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
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Spinner /> Cadastrando...
            </>
          ) : (
            "Registrar"
          )}
        </Button>
      </div>
    </Form>
  );
};

export { RegisterForm };
