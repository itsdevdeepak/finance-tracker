import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";
import { connection } from "next/server";

export type SessionState = {
  isAuth: boolean;
  userId: string | null;
};

export async function getSessionState(): Promise<SessionState> {
  await connection();
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

  return { isAuth: session.isAuth, userId: session.userId };
}
