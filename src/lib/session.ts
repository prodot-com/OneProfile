import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function getCurrentUser() {
  const session = await requireSession();

  return session.user;
}

export async function getCurrentProfile() {
  const session = await requireSession();

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  return profile;
}

export async function requireProfile() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/onboarding");
  }

  return profile;
}

export async function requireUserAndProfile() {
  const session = await requireSession();

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!profile) {
    redirect("/onboarding");
  }

  return {
    session,
    user: session.user,
    profile,
  };
}
