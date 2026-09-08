import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickStatsBar from "@/components/dashboard/QuickStatsBar";
import QuickActions from "@/components/dashboard/QuickActions";
import TopLinksWidget from "@/components/dashboard/TopLinksWidget";
import ProfileCompletionCard from "@/components/dashboard/ProfileCompletionCard";
import RecentActivityWidget from "@/components/dashboard/RecentActivityWidget";
import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";

export default async function DashboardPage() {
  const { user, profile } = await requireUserAndProfile();

  const [links, recentClicks, socialCount] = await Promise.all([
    prisma.link.findMany({
      where: { profileId: profile.id },
      orderBy: { clicks: "desc" },
    }),

    prisma.click.findMany({
      where: { link: { profileId: profile.id } },
      include: { link: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),

    prisma.socialLink.count({
      where: { profileId: profile.id },
    }),
  ]);

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);
  const activeLinks = links.filter((l) => l.active);
  const topLink = links.length > 0 ? links[0].title : null;

  const formattedClicks = recentClicks.map((c) => ({
    id: c.id,
    linkTitle: c.link.title,
    country: c.country,
    city: c.city,
    device: c.device,
    browser: c.browser,
    createdAtFormatted: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(c.createdAt),
  }));

  return (
    <>
      <DashboardHeader profile={profile} />

      <QuickStatsBar
        totalClicks={totalClicks}
        profileViews={profile.views}
        activeLinks={activeLinks.length}
        topLink={topLink}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column — 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <QuickActions profileUrl={`oneprofile.me/${profile.username}`} />
          <TopLinksWidget
            links={links.slice(0, 5).map((l) => ({
              id: l.id,
              title: l.title,
              url: l.url,
              clicks: l.clicks,
            }))}
          />
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-6">
          <ProfileCompletionCard
            hasAvatar={!!profile.avatar}
            hasBanner={!!profile.banner}
            hasBio={!!profile.bio}
            hasWebsite={!!profile.website}
            hasSocials={socialCount > 0}
          />
          <RecentActivityWidget clicks={formattedClicks} />
        </div>
      </div>
    </>
  );
}
