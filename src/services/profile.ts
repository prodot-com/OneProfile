"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const RESERVED = ["admin", "login", "dashboard", "settings", "api", "support"];

export async function createProfile(
  prevState: { error: string },
  formData: FormData,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      error: "Please sign in first.",
    };
  }

  const username = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase();

  if (!/^[a-z0-9-]{3,30}$/.test(username)) {
    return {
      error:
        "Username must be 3–30 characters and only contain lowercase letters, numbers, and hyphens.",
    };
  }

  if (RESERVED.includes(username)) {
    return {
      error: "This username is reserved.",
    };
  }

  const exists = await prisma.profile.findUnique({
    where: {
      username,
    },
  });

  if (exists) {
    return {
      error: "Username is already taken.",
    };
  }

  await prisma.profile.create({
    data: {
      username,
      displayName: session.user.name || username,
      avatar: session.user.image,
      userId: session.user.id,
    },
  });

  redirect("/dashboard");
}
