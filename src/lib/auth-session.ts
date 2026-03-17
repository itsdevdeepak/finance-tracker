import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";

export async function verifySession() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.user.id };
}
