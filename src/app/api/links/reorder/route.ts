import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { profile } = await requireUserAndProfile();
    const data = await req.json();
    
    if (!data.links || !Array.isArray(data.links)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const { links } = data as { links: { id: string; position: number }[] };

    // Use a transaction to perform all updates at once
    await prisma.$transaction(
      links.map((link) =>
        prisma.link.update({
          where: {
            id: link.id,
            profileId: profile.id, // Security: ensure the link actually belongs to the user
          },
          data: {
            position: link.position,
          },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reorder Links Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
