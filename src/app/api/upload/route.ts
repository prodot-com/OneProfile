import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/r2";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const extension = file.name.split(".").pop();

    const key = `avatars/${crypto.randomUUID()}.${extension}`;

    const url = await uploadFile(buffer, key, file.type);

    return NextResponse.json({
      success: true,
      url,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
