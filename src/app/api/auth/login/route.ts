import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const cookieStore = await cookies();

    cookieStore.set("session_user", JSON.stringify(body), {
      httpOnly: true,
    });

    return NextResponse.json({ user: body }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

const fetchUser = async (email: string) => {
  return await fetch(`http://localhost:3001/users?email=${email}`);
};
