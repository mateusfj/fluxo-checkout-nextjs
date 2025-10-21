"use client";

import { IUser } from "@/@types/auth/IUser";
import { getTokens } from "@/actions/get-token";
import { decodeToken } from "@/utils/functions/decodeTokenJwt";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SignInProps {
  email: string;
  senha: string;
}

interface AuthContextType {
  signIn: (user: SignInProps) => Promise<void>;
  user: Partial<IUser> | null;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<IUser> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthCookie = async () => {
      const { access_token } = await getTokens();
      if (access_token) {
        try {
          const decodedData = decodeToken(access_token);
          if (decodedData && decodedData.sub) {
            setUser({
              email: decodedData.email as string,
              id: decodedData.sub as string,
              nome: decodedData.nome as string,
              tipo_usuario: decodedData.tipo_usuario as string,
            });
          }
        } catch (error) {
          console.error("Erro ao decodificar token:", error);
        }
      }
    };
    checkAuthCookie();
  }, []);

  const signIn = async ({ email, senha }: SignInProps) => {
    try {
      const response = await fetch("/api/auth/login", {
        body: JSON.stringify({ email, senha }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro no login");
      }
      const data = await response.json();

      if (data.decodedData) {
        setUser({
          email: data.decodedData.email,
          id: data.decodedData.sub,
          nome: data.decodedData.nome,
          tipo_usuario: data.decodedData.tipo_usuario,
        });
        toast.success("Login feito com sucesso.", {
          duration: 2000,
          id: "success",
        });
        router.push("/inicio");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, user }}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </AuthContext.Provider>
  );
};
