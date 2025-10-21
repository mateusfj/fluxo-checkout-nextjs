"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, createContext, useEffect, useState } from "react";
import { getSession } from "../functions/getToken";

interface AuthContextType {
  user: Partial<any> | null;
  setUser: (user: Partial<any> | null) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<any> | null>(null);

  useEffect(() => {
    console.log(user);
  }, []);

  useEffect(() => {
    const checkAuthCookie = async () => {
      const sessionUser = await getSession();
      if (sessionUser) {
        setUser({
          ...JSON.parse(sessionUser),
        });
      }
    };
    checkAuthCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </AuthContext.Provider>
  );
};
