import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    const responseUser = await fetchUser(email);

    if (!responseUser) {
      return NextResponse.json(
        { message: "Usuário não encontrado", statusCode: 401 },
        { status: 401 }
      );
    }

    const data = await responseUser.json();

    const cookieStore = await cookies();

    cookieStore.set("session_user", JSON.stringify(data[0]), {
      httpOnly: true,
    });

    return NextResponse.json(
      { user: data[0], message: "Login realizado com sucesso" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Erro interno do servidor", statusCode: 500 },
      { status: 500 }
    );
  }
}

const fetchUser = async (email: string) => {
  return await fetch(`http://localhost:3001/users?email=${email}`);
};
