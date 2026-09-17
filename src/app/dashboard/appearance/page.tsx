import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";
import { DesignPage } from "@/components/dashboard/design/DesignPage";

export default async function AppearancePage() {
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
    <div className="split-layout lg:h-full lg:flex lg:flex-col lg:min-h-0 lg:px-4 w-full">
      <DesignPage
        profile={{
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          bio: profile.bio,
          avatar: profile.avatar,
          banner: profile.banner,
          website: profile.website,
          theme: profile.theme,
          accentColor: profile.accentColor,
          backgroundColor: profile.backgroundColor || undefined,
          buttonColor: profile.buttonColor,
          buttonTextColor: profile.buttonTextColor,
          buttonStyle: profile.buttonStyle,
          fontFamily: profile.fontFamily,
          isPublic: profile.isPublic,
        }}
        links={links}
        socials={socials}
      />
    </div>
  );
}
