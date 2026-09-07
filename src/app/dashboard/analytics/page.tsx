import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";

export default async function AnalyticsPage() {
  const { profile } = await requireUserAndProfile();

  const [links, clicks] = await Promise.all([
    prisma.link.findMany({
      where: {
        profileId: profile.id,
      },
      orderBy: {
        clicks: "desc",
      },
    }),

    prisma.click.findMany({
      where: {
        link: {
          profileId: profile.id,
        },
      },
      include: {
        link: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    }),
  ]);

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

        // keep ISO if you need it later
        createdAt: c.createdAt.toISOString(),

        // format on the server
        createdAtFormatted: new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(c.createdAt),

        link: {
          title: c.link.title,
        },
      }))}
    />
  );
}