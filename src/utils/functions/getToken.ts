"use server";

import { cookies } from "next/headers";

export const getSession = async () => {
  const cookiesStore = await cookies();
  const sessionUser = cookiesStore.get("session_user")?.value;
  return sessionUser;
};
