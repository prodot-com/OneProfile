import { ProfileCustomizationData } from "./profileCustomization";
import { Profile } from "@prisma/client";

export async function updateCustomization(
  data: ProfileCustomizationData
): Promise<{ success: boolean; profile?: Profile; error?: string }> {
  const res = await fetch("/api/profile/customize", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to customize profile");
  }

  return res.json();
}
