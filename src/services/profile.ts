"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Theme, ButtonStyle, FontFamily } from "@prisma/client";
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
            (Object.values(Theme).includes(data.theme?.toUpperCase() as Theme)
              ? (data.theme!.toUpperCase() as Theme)
              : Theme.DEFAULT),

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

export interface UpdateProfileInput {
  displayName?: string;
  username?: string;
  bio?: string;
  website?: string;
  avatar?: string;
  banner?: string;
  theme?: string;
  isPublic?: boolean;
  accentColor?: string;
  backgroundColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  buttonStyle?: string;
  fontFamily?: string;
}

export async function updateProfile(data: UpdateProfileInput) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return { success: false, error: "Profile not found" };
    }

    const updateData: Record<string, unknown> = {};

    console.log("Data: ", data)

    // Display name
    if (data.displayName !== undefined) {
      const name = data.displayName.trim();
      if (!name) {
        return { success: false, error: "Display name cannot be empty." };
      }
      updateData.displayName = name;
    }

    // Username
    if (data.username !== undefined && data.username !== profile.username) {
      const username = data.username.trim().toLowerCase();

      if (!/^[a-z0-9-]{3,30}$/.test(username)) {
        return {
          success: false,
          error: "Username must be 3-30 characters: lowercase letters, numbers, hyphens.",
        };
      }

      if (RESERVED_USERNAMES.includes(username)) {
        return { success: false, error: "This username is reserved." };
      }

      const taken = await prisma.profile.findUnique({ where: { username } });
      if (taken) {
        return { success: false, error: "Username already taken." };
      }

      updateData.username = username;
    }

    // Bio
    if (data.bio !== undefined) {
      updateData.bio = data.bio.trim() || null;
    }

    // Website
    if (data.website !== undefined) {
      if (data.website.trim()) {
        try {
          updateData.website = new URL(data.website.trim()).toString();
        } catch {
          return { success: false, error: "Invalid website URL." };
        }
      } else {
        updateData.website = null;
      }
    }

    // Avatar & Banner
    if (data.avatar !== undefined) updateData.avatar = data.avatar || null;
    if (data.banner !== undefined) updateData.banner = data.banner || null;

    // Theme
    if (data.theme !== undefined) {
      const upper = data.theme.toUpperCase();
      if (Object.values(Theme).includes(upper as Theme)) {
        updateData.theme = upper as Theme;
      } else {
        return { success: false, error: "Invalid theme." };
      }
    }

    // Public / Private
    if (data.isPublic !== undefined) {
      updateData.isPublic = data.isPublic;
    }

    // Design Tokens
    if (data.accentColor !== undefined) updateData.accentColor = data.accentColor;
    if (data.backgroundColor !== undefined) updateData.backgroundColor = data.backgroundColor;
    if (data.buttonColor !== undefined) updateData.buttonColor = data.buttonColor;
    if (data.buttonTextColor !== undefined) updateData.buttonTextColor = data.buttonTextColor;
    
    if (data.buttonStyle !== undefined) {
      const upperBtn = data.buttonStyle.toUpperCase();
      if (Object.values(ButtonStyle).includes(upperBtn as ButtonStyle)) {
        updateData.buttonStyle = upperBtn as ButtonStyle;
      }
    }
    
    if (data.fontFamily !== undefined) {
      const upperFont = data.fontFamily.toUpperCase();
      if (Object.values(FontFamily).includes(upperFont as FontFamily)) {
        updateData.fontFamily = upperFont as FontFamily;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return { success: true };
    }

    const pro =  await prisma.profile.update({
      where: { id: profile.id },
      data: updateData,
    });

    console.log(pro)

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Something went wrong." };
  }
}