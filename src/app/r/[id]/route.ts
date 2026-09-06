import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import {UAParser} from "ua-parser-js";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const link = await prisma.link.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });

    if (!link) {
      return NextResponse.json(
        {
          success: false,
          message: "Link not found.",
        },
        { status: 404 },
      );
    }

    if (!link.active) {
      return NextResponse.json(
        {
          success: false,
          message: "This link is disabled.",
        },
        { status: 403 },
      );
    }

    if (!link.profile.isPublic) {
      return NextResponse.json(
        {
          success: false,
          message: "This profile is private.",
        },
        { status: 403 },
      );
    }

    const now = new Date();

    if (link.startAt && now < link.startAt) {
      return NextResponse.json(
        {
          success: false,
          message: "This link is not yet active.",
        },
        { status: 403 },
      );
    }

    if (link.endAt && now > link.endAt) {
      return NextResponse.json(
        {
          success: false,
          message: "This link has expired.",
        },
        { status: 403 },
      );
    }

    // -----------------------
    // Parse Visitor
    // -----------------------

    const userAgent = req.headers.get("user-agent") ?? "";

    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const browser = result.browser.name ?? null;
    const os = result.os.name ?? null;
    const device =
      result.device.type ??
      (result.os.name?.includes("Android") || result.os.name?.includes("iOS")
        ? "mobile"
        : "desktop");

    const referrer = req.headers.get("referer") ?? null;

    // Works on Vercel / most proxies
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const ipHash = createHash("sha256").update(ip).digest("hex");

    // Country headers (Vercel / Cloudflare)
    const country =
      req.headers.get("x-vercel-ip-country") ??
      req.headers.get("cf-ipcountry") ??
      null;

    const city = req.headers.get("x-vercel-ip-city") ?? null;

    // -----------------------
    // Save analytics
    // -----------------------

    await prisma.$transaction([
      prisma.link.update({
        where: {
          id: link.id,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      }),

      prisma.click.create({
        data: {
          linkId: link.id,
          browser,
          os,
          device,
          referrer,
          ipHash,
          country,
          city,
        },
      }),
    ]);

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
      },
    );
  }
}
