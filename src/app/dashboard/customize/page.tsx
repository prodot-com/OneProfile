import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";
import CustomizeClient from "@/components/customize/CustomizeClient";

export default async function CustomizePage() {
  const { profile } = await requireUserAndProfile();

  const [links, socials] = await Promise.all([
    prisma.link.findMany({
      where: { profileId: profile.id },
      orderBy: { position: "asc" },
    }),
    prisma.socialLink.findMany({
      where: { profileId: profile.id },
    }),
  ]);

  return (
    <div className="split-layout lg:h-full lg:flex lg:flex-col lg:min-h-0 lg:px-12 lg:py-8 w-full">
      <CustomizeClient
        profile={{
          ...profile,
          // Extract specific properties to avoid sending full profile object if not strictly needed,
          // though safe enough since requireUserAndProfile doesn't bring back auth tokens
        }}
        links={links}
        socials={socials}
      />
    </div>
  );
}
