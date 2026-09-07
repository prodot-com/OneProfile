"use client";

import {
  TrendingUp,
  Link2,
  Users,
  Globe,
  Monitor,
  Smartphone,
  Clock,
  MapPin,
  ExternalLink,
  Activity,
} from "lucide-react";
import ClicksBarChart from "./ClicksBarChart";
import DeviceDonutChart from "./DeviceDonutChart";
import CountryBarChart from "./CountryBarChart";

/* ─── Types (plain, serialisable) ─── */
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  clicks: number;
}

export interface ClickItem {
  id: string;
  country: string | null;
  city: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  createdAt: string; // ISO string — Date is not serialisable across server/client
  link: { title: string };
}

interface Props {
  links: LinkItem[];
  clicks: ClickItem[];
}

export default function AnalyticsDashboard({ links, clicks }: Props) {
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);

  /* Clicks per link bar chart */
  const clicksChartData = links
    .slice(0, 8)
    .map((l) => ({ name: l.title, clicks: l.clicks }));

  /* Device breakdown */
  const deviceMap: Record<string, number> = {};
  for (const c of clicks) {
    const d = c.device ?? "Unknown";
    deviceMap[d] = (deviceMap[d] ?? 0) + 1;
  }
  const deviceData = Object.entries(deviceMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  /* Country breakdown */
  const countryMap: Record<string, number> = {};
  for (const c of clicks) {
    const co = c.country ?? "Unknown";
    countryMap[co] = (countryMap[co] ?? 0) + 1;
  }
  const countryData = Object.entries(countryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  /* Browser summary */
  const browserMap: Record<string, number> = {};
  for (const c of clicks) {
    const b = c.browser ?? "Unknown";
    browserMap[b] = (browserMap[b] ?? 0) + 1;
  }
  const topBrowser = Object.entries(browserMap).sort((a, b) => b[1] - a[1])[0];

  const avgClicksPerLink =
    links.length > 0 ? (totalClicks / links.length).toFixed(1) : "0";

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Analytics
          </h1>
          <p className="mt-1.5 text-zinc-500">
            Track and understand your profile performance
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-500 shadow-sm">
          <Activity className="size-3.5 text-emerald-500" />
          Live data
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<TrendingUp className="size-5" />}
          label="Total Clicks"
          value={totalClicks.toLocaleString()}
          color="violet"
          sub="across all links"
        />
        <KpiCard
          icon={<Link2 className="size-5" />}
          label="Active Links"
          value={links.length.toString()}
          color="blue"
          sub={`avg ${avgClicksPerLink} clicks each`}
        />
        <KpiCard
          icon={<Users className="size-5" />}
          label="Recent Visitors"
          value={clicks.length.toString()}
          color="cyan"
          sub="last 50 recorded"
        />
        <KpiCard
          icon={<Globe className="size-5" />}
          label="Top Browser"
          value={topBrowser?.[0] ?? "—"}
          color="emerald"
          sub={topBrowser ? `${topBrowser[1]} sessions` : "no data"}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Clicks by Link"
            subtitle="Top performing links"
            icon={<TrendingUp className="size-4 text-violet-500" />}
          >
            <ClicksBarChart data={clicksChartData} />
          </ChartCard>
        </div>
        <ChartCard
          title="Device Breakdown"
          subtitle="Visitor platforms"
          icon={<Smartphone className="size-4 text-cyan-500" />}
        >
          <DeviceDonutChart data={deviceData} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Top Countries"
          subtitle="Where your visitors come from"
          icon={<MapPin className="size-4 text-blue-500" />}
        >
          <CountryBarChart data={countryData} />
        </ChartCard>

        {/* Top Links ranking */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-4">
            <Monitor className="size-4 text-emerald-500" />
            <div>
              <h2 className="text-sm font-semibold text-zinc-800">Top Links</h2>
              <p className="text-xs text-zinc-400">Ranked by click count</p>
            </div>
          </div>
          {links.length === 0 ? (
            <EmptyState message="No links yet. Add some links to your profile." />
          ) : (
            <div className="divide-y divide-zinc-50">
              {links.slice(0, 6).map((link, i) => {
                const pct =
                  totalClicks > 0
                    ? Math.round((link.clicks / totalClicks) * 100)
                    : 0;
                return (
                  <div
                    key={link.id}
                    className="flex items-center gap-4 px-5 py-3"
                  >
                    <span className="w-5 text-right text-xs font-bold text-zinc-300">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-zinc-800">
                          {link.title}
                        </p>
                        <span className="shrink-0 text-xs font-semibold text-violet-600">
                          {link.clicks.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-1">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-zinc-400">
                        {link.url}
                      </p>
                    </div>
                    <ExternalLink className="size-3.5 shrink-0 text-zinc-300" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-4">
          <Clock className="size-4 text-amber-500" />
          <div>
            <h2 className="text-sm font-semibold text-zinc-800">
              Recent Activity
            </h2>
            <p className="text-xs text-zinc-400">
              Last 20 clicks on your links
            </p>
          </div>
        </div>
        {clicks.length === 0 ? (
          <EmptyState message="No activity recorded yet." />
        ) : (
          <div className="divide-y divide-zinc-50">
            {clicks.slice(0, 20).map((click) => (
              <div
                key={click.id}
                className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="size-2 shrink-0 rounded-full bg-emerald-400" />
                    <p className="truncate text-sm font-medium text-zinc-800">
                      {click.link.title}
                    </p>
                  </div>
                  <div className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-zinc-400">
                    {click.country && (
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {click.city ? `${click.city}, ` : ""}
                        {click.country}
                      </span>
                    )}
                    {click.device && <span>· {click.device}</span>}
                    {click.browser && <span>· {click.browser}</span>}
                  </div>
                </div>
                <time className="shrink-0 text-xs text-zinc-400">
                  {new Date(click.createdAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Sub-components ─── */

function KpiCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: "violet" | "blue" | "cyan" | "emerald";
}) {
  const colors: Record<string, string> = {
    violet: "bg-violet-50 text-violet-600 ring-violet-200",
    blue: "bg-blue-50 text-blue-600 ring-blue-200",
    cyan: "bg-cyan-50 text-cyan-600 ring-cyan-200",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  };
  const blobs: Record<string, string> = {
    violet: "bg-violet-400",
    blue: "bg-blue-400",
    cyan: "bg-cyan-400",
    emerald: "bg-emerald-400",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`absolute -right-4 -top-4 size-24 rounded-full opacity-10 blur-2xl ${blobs[color]}`}
      />
      <div
        className={`inline-flex size-10 items-center justify-center rounded-xl ring-1 ${colors[color]}`}
      >
        {icon}
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-zinc-400">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-zinc-400">{sub}</p>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-5 py-4">
        {icon}
        <div>
          <h2 className="text-sm font-semibold text-zinc-800">{title}</h2>
          <p className="text-xs text-zinc-400">{subtitle}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-zinc-100">
        <Activity className="size-5 text-zinc-300" />
      </div>
      <p className="text-sm text-zinc-400">{message}</p>
    </div>
  );
}
