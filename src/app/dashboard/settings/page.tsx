import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";
import SettingsPage from "@/components/settings/SettingsPage";

export default async function Page() {
  const { user, profile } = await requireUserAndProfile();

  const sessionCount = await prisma.session.count({
    where: { userId: user.id },
  });

  return (
    <SettingsPage
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
      }}
      profile={{
        username: profile.username,
        isPublic: profile.isPublic,
      }}
      sessionCount={sessionCount}
    />
  );
}
