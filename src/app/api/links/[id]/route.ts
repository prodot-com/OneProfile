import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requireSession, requireUserAndProfile } from "@/lib/session";
import { fetchOpenGraph } from "@/lib/og";

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

    const { title, url, description, icon, active, startAt, endAt, refreshMetadata } = body;

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

    let ogUpdateData: any = {};
    if (existingLink.url !== url || refreshMetadata) {
      try {
        const ogData = await fetchOpenGraph(url);
        ogUpdateData = {
          ogTitle: ogData.title || null,
          ogDescription: ogData.description || null,
          ogImage: ogData.image || null,
          ogSiteName: ogData.siteName || null,
          favicon: ogData.favicon || null,
          lastMetadataFetch: new Date(),
        };
      } catch (err) {
        console.error("OG Update Fetch Error:", err);
      }
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
        ...ogUpdateData,
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