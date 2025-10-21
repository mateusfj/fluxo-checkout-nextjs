"use client";

import { AuthContext } from "@/utils/providers/AuthProvider";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <main>
      <h1>Private Home Page</h1>
      {user && (
        <div>
          <h2>Welcome, {user.nome}!</h2>
          <p>Email: {user.email}</p>
          <p>Tipo de Usuário: {user.tipo_usuario}</p>
        </div>
      )}
    </main>
  );
};

export default Home;
