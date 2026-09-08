import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updateProfileTheme } from "@/services/profileCustomization";

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await req.json();

    const updatedProfile = await updateProfileTheme(session.user.id, data);
    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error("Customize error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
