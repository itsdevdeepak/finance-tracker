import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";

export type SessionState = {
  isAuth: boolean;
  userId: string | null;
};

export async function getSessionState(): Promise<SessionState> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user.id) {
      return { isAuth: false, userId: null };
    }

    return { isAuth: true, userId: session.user.id };
  } catch (error) {
    console.error(error);
    return { isAuth: false, userId: null };
  }
}

export async function verifySession() {
  const session = await getSessionState();

  if (!session.userId) {
    redirect("/login");
  }

  return session;
}
