import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  try {
    const link = await prisma.link.findUnique({
      where: {
        id,
      },
    });

    if (!link || !link.active) {
      return NextResponse.json(
        {
          success: false,
          message: "Link not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Increment click count
    await prisma.link.update({
      where: {
        id,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return NextResponse.redirect(link.url);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}