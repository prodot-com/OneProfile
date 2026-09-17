import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";
import AccountsPage from "@/components/settings/SettingsPage";

export default async function Page() {
  const { user, profile, account } = await requireUserAndProfile();
  // console.log(profile);
  const sessionCount = await prisma.session.count({
    where: { userId: user.id },
  });

  return (
    <AccountsPage
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
      }}
      profile={{
        username: profile.username,
        isPublic: profile.isPublic,
        avatar: profile.avatar ?? "/avatar.jpeg",
        displayName: profile.displayName,
      }}
      account={{
        providerId: account?.providerId,
      }}
      sessionCount={sessionCount}
    />
  );
}
