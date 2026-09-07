import { requireUserAndProfile } from "@/lib/session";
import ProfileEditForm from "@/components/dashboard/ProfileEditForm";

export default async function AppearancePage() {
  const { profile } = await requireUserAndProfile();

  return (
    <ProfileEditForm
      profile={{
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        bio: profile.bio,
        avatar: profile.avatar,
        banner: profile.banner,
        website: profile.website,
        theme: profile.theme,
        isPublic: profile.isPublic,
      }}
    />
  );
}
