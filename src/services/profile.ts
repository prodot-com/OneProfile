"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export interface CreateProfileInput {
  username: string;
  displayName: string;
  bio?: string;
  website?: string;
  avatar?: string;
  theme?: string;
}

const RESERVED_USERNAMES = [
  "admin",
  "api",
  "dashboard",
  "settings",
  "login",
  "register",
  "support",
  "about",
  "pricing",
  "privacy",
  "terms",
];

export async function createProfile(
  data: CreateProfileInput
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const username = data.username
      .trim()
      .toLowerCase();

    if (
      !/^[a-z0-9-]{3,30}$/.test(username)
    ) {
      return {
        success: false,
        error:
          "Username must contain only lowercase letters, numbers and hyphens.",
      };
    }

    if (
      RESERVED_USERNAMES.includes(username)
    ) {
      return {
        success: false,
        error:
          "This username is reserved.",
      };
    }

    const existingProfile =
      await prisma.profile.findUnique({
        where: {
          userId: session.user.id,
        },
      });

    if (existingProfile) {
      return {
        success: false,
        error:
          "You already have a profile.",
      };
    }

    const existingUsername =
      await prisma.profile.findUnique({
        where: {
          username,
        },
      });

    if (existingUsername) {
      return {
        success: false,
        error:
          "Username already taken.",
      };
    }

    let website: string | null = null;

    if (data.website) {
      try {
        website = new URL(
          data.website
        ).toString();
      } catch {
        return {
          success: false,
          error: "Invalid website.",
        };
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.profile.create({
        data: {
          username,

          displayName:
            data.displayName.trim() ||
            session.user.name,

          bio:
            data.bio?.trim() || null,

          website,

          avatar:
            data.avatar ||
            session.user.image,

          theme:
            data.theme || "default",

          userId: session.user.id,
        },
      });
    });

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      error:
        "Something went wrong.",
    };
  }
}