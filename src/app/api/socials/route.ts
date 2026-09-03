import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

/* -------------------- GET -------------------- */

export async function GET() {
  try {
    const session = await requireSession();

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
        { status: 404 }
      );
    }

    const socials = await prisma.socialLink.findMany({
      where: {
        profileId: profile.id,
      },
      orderBy: {
        platform: "asc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: socials,
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}

/* -------------------- POST -------------------- */

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();

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
        {
          status: 404,
        }
      );
    }

    const { platform, url } = await req.json();

    if (!platform || !url) {
      return NextResponse.json(
        {
          success: false,
          message: "Platform and URL are required.",
        },
        {
          status: 400,
        }
      );
    }

    const exists = await prisma.socialLink.findUnique({
      where: {
        profileId_platform: {
          profileId: profile.id,
          platform,
        },
      },
    });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "This social platform already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const social = await prisma.socialLink.create({
      data: {
        platform,
        url,
        profileId: profile.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Social link created.",
        data: social,
      },
      {
        status: 201,
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

/* -------------------- PUT -------------------- */

export async function PUT(req: NextRequest) {
  try {
    const session = await requireSession();

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
        {
          status: 404,
        }
      );
    }

    const { id, platform, url } = await req.json();

    const social = await prisma.socialLink.findFirst({
      where: {
        id,
        profileId: profile.id,
      },
    });

    if (!social) {
      return NextResponse.json(
        {
          success: false,
          message: "Social link not found.",
        },
        {
          status: 404,
        }
      );
    }

    const updated = await prisma.socialLink.update({
      where: {
        id,
      },
      data: {
        platform,
        url,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Social updated.",
        data: updated,
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

/* -------------------- DELETE -------------------- */

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireSession();

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
        {
          status: 404,
        }
      );
    }

    const { id } = await req.json();

    const social = await prisma.socialLink.findFirst({
      where: {
        id,
        profileId: profile.id,
      },
    });

    if (!social) {
      return NextResponse.json(
        {
          success: false,
          message: "Social link not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.socialLink.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Social deleted.",
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