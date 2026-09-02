import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requireSession, requireUserAndProfile } from "@/lib/session";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { id } = await params;

    const body = await req.json();

    const { title, url, description, icon, active, startAt, endAt } = body;

    const profile = await prisma.profile.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found.",
        },
        { status: 404 },
      );
    }

    const existingLink = await prisma.link.findFirst({
      where: {
        id,
        profileId: profile.id,
      },
    });

    if (!existingLink) {
      return NextResponse.json(
        {
          success: false,
          message: "Link not found.",
        },
        { status: 404 },
      );
    }

    const updatedLink = await prisma.link.update({
      where: {
        id,
      },
      data: {
        title,
        url,
        description: description || null,
        icon: icon || null,
        active,
        startAt: startAt ? new Date(startAt) : null,
        endAt: endAt ? new Date(endAt) : null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Link updated successfully.",
        data: updatedLink,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { profile } = await requireUserAndProfile();

    const { id } = await params;

    const link = await prisma.link.findFirst({
      where: {
        id,
        profileId: profile.id,
      },
    });

    if (!link) {
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

    await prisma.link.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Link deleted successfully.",
      },
      {
        status: 200,
      }
    );
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