import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(userId: any) {
  // if(!userId){
  //     return {
  //         success: false,
  //         error: "userid required"
  //     }
  // }

  try {
    const session = await requireSession();
    console.log("session: ",session)

    if (!session) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!profile) {
      return {
        success: false,
        error: "Profile not found",
      };
    }

    const links = await prisma.link.findMany({
      where: {
        profileId: profile.id,
      },
      orderBy: {
        position: "asc",
      },
    });

    console.log("Links: ", links);

        return NextResponse.json(
      {
        success: true,
        message: "Link fetched successfully.",
        data: links,
      },
      {
        status: 201,
      },
    );
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();

    const {
      title,
      url,
      description,
      icon,
      active = true,
      startAt,
      endAt,
    } = body;

    if (!title || !url) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and URL are required.",
        },
        {
          status: 400,
        },
      );
    }

    // Find the user's profile
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
        },
      );
    }

    // Determine next position
    const count = await prisma.link.count({
      where: {
        profileId: profile.id,
      },
    });

    const link = await prisma.link.create({
      data: {
        title,
        url,
        description: description || null,
        icon: icon || null,
        active,
        position: count + 1,
        startAt: startAt ? new Date(startAt) : null,
        endAt: endAt ? new Date(endAt) : null,
        profileId: profile.id,
      },
    });

    console.log(link);

    return NextResponse.json(
      {
        success: true,
        message: "Link created successfully.",
        data: link,
      },
      {
        status: 201,
      },
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

export async function PUT(req: NextRequest){
  try {
    const session = await requireSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();

    if(!body){
      return NextResponse.json({
        success: false,
        message: "no change"
      },
    {
      status: 203
    }
    )
    }

    

  } catch (error) {
    
  }
}