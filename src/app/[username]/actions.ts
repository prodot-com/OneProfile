"use server";

import { prisma } from "@/lib/prisma";

export async function incrementViewCount(profileId: string) {
  try {
    await prisma.profile.update({
      where: { id: profileId },
      data: { views: { increment: 1 } }
    });
  } catch (error) {
    // Silently continue
  }
}
