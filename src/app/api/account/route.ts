import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function DELETE() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Cascade delete: User → Profile → Links → Clicks, SocialLinks, Sessions, Accounts
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Account deletion error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete account." },
      { status: 500 }
    );
  }
}
