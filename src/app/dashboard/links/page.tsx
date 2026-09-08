import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";
import LinksPage from "@/components/LinkPage/LinkPage";

export default async function Page() {
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
    <LinksPage
      links={links}
      socials={socials}
      profile={{
        displayName: profile.displayName,
        username: profile.username,
        bio: profile.bio,
        avatar: profile.avatar,
        banner: profile.banner,
        website: profile.website,
      }}
    />
  );
}
