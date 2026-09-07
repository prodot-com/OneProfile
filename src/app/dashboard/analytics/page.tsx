import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";

export default async function AnalyticsPage() {
  const { profile } = await requireUserAndProfile();

  const [links, clicks] = await Promise.all([
    prisma.link.findMany({
      where: { profileId: profile.id },
      orderBy: { clicks: "desc" },
    }),
    prisma.click.findMany({
      where: { link: { profileId: profile.id } },
      include: { link: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  // Serialise Date → ISO string before passing to Client Component
  return (
    <AnalyticsDashboard
      links={links.map((l) => ({
        id: l.id,
        title: l.title,
        url: l.url,
        clicks: l.clicks,
      }))}
      clicks={clicks.map((c) => ({
        id: c.id,
        country: c.country,
        city: c.city,
        browser: c.browser,
        os: c.os,
        device: c.device,
        createdAt: c.createdAt.toISOString(),
        link: { title: c.link.title },
      }))}
    />
  );
}