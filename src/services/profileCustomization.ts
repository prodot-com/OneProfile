import { prisma } from "@/lib/prisma";
import { Profile } from "@prisma/client";

export type ProfileCustomizationData = Partial<
  Pick<
    Profile,
    | "theme"
    | "accentColor"
    | "backgroundColor"
    | "buttonStyle"
    | "fontFamily"
    | "buttonColor"
    | "buttonTextColor"
  >
>;

// Backend-only service
export async function updateProfileTheme(
  userId: string,
  data: ProfileCustomizationData
) {
  return prisma.profile.update({
    where: { userId },
    data,
  });
}
