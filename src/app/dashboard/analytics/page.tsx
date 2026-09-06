import { prisma } from "@/lib/prisma";
import { requireUserAndProfile } from "@/lib/session";

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
      take: 20,
    }),
  ]);

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  const totalVisitors = clicks.length;

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>

        <p className="mt-2 text-zinc-500">
          Track your profile performance.
        </p>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm text-zinc-500">Total Clicks</p>

          <h2 className="mt-2 text-4xl font-bold">
            {totalClicks}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm text-zinc-500">Total Links</p>

          <h2 className="mt-2 text-4xl font-bold">
            {links.length}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm text-zinc-500">Visitors</p>

          <h2 className="mt-2 text-4xl font-bold">
            {totalVisitors}
          </h2>
        </div>
      </div>

      {/* Top Links */}

      <div className="rounded-2xl border bg-white">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Top Links
          </h2>
        </div>

        {links.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            No links yet.
          </div>
        ) : (
          <div className="divide-y">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-5"
              >
                <div>
                  <h3 className="font-medium">
                    {link.title}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {link.url}
                  </p>
                </div>

                <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm">
                  {link.clicks} Clicks
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}

      <div className="rounded-2xl border bg-white">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Recent Clicks
          </h2>
        </div>

        {clicks.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            No analytics available.
          </div>
        ) : (
          <div className="divide-y">
            {clicks.map((click) => (
              <div
                key={click.id}
                className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium">
                    {click.link.title}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {click.country || "Unknown Country"}
                    {" • "}
                    {click.city || "Unknown City"}
                  </p>

                  <p className="text-xs text-zinc-400">
                    {click.browser || "Unknown Browser"}
                    {" • "}
                    {click.os || "Unknown OS"}
                    {" • "}
                    {click.device || "Unknown Device"}
                  </p>
                </div>

                <span className="text-sm text-zinc-500">
                  {click.createdAt.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}