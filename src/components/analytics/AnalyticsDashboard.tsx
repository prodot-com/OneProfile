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
import { motion, Variants } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ClicksBarChart from "./ClicksBarChart";
import DeviceDonutChart from "./DeviceDonutChart";
import CountryBarChart from "./CountryBarChart";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};



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

  createdAt: string;
  createdAtFormatted: string;

  link: {
    title: string;
  };
}

interface Props {
  links: LinkItem[];
  clicks: ClickItem[];
}

export default function AnalyticsDashboard({ links, clicks }: Props) {
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);

  const clicksChartData = links
    .slice(0, 8)
    .map((l) => ({ name: l.title, clicks: l.clicks }));

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
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
            Analytics
          </h1>
          <p className="mt-2 text-lg text-[#6b6b6b]">
            Track and understand your profile performance
          </p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <KpiCard
            icon={<TrendingUp className="size-5" />}
            label="Total Clicks"
            value={totalClicks.toLocaleString()}
            color="violet"
            sub="across all links"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KpiCard
            icon={<Link2 className="size-5" />}
            label="Active Links"
            value={links.length.toString()}
            color="blue"
            sub={`avg ${avgClicksPerLink} clicks each`}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KpiCard
            icon={<Users className="size-5" />}
            label="Recent Visitors"
            value={clicks.length.toString()}
            color="cyan"
            sub="last 50 recorded"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KpiCard
            icon={<Globe className="size-5" />}
            label="Top Browser"
            value={topBrowser?.[0] ?? "—"}
            color="emerald"
            sub={topBrowser ? `${topBrowser[1]} sessions` : "no data"}
          />
        </motion.div>
      </motion.div>

      {/* Charts Row 1 */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 lg:grid-cols-3"
      >
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ChartCard
            title="Clicks by Link"
            subtitle="Top performing links"
            icon={<TrendingUp className="size-4.5 text-[#f97316]" />}
          >
            <ClicksBarChart data={clicksChartData} />
          </ChartCard>
        </motion.div>
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Device Breakdown"
            subtitle="Visitor platforms"
            icon={<Smartphone className="size-4.5 text-[#f97316]" />}
          >
            <DeviceDonutChart data={deviceData} />
          </ChartCard>
        </motion.div>
      </motion.div>

      {/* Charts Row 2 */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <motion.div variants={itemVariants}>
          <ChartCard
            title="Top Countries"
            subtitle="Where your visitors come from"
            icon={<MapPin className="size-4.5 text-[#f97316]" />}
          >
            <CountryBarChart data={countryData} />
          </ChartCard>
        </motion.div>

        {/* Top Links ranking */}
        <motion.div variants={itemVariants} className="group rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md shadow-sm overflow-hidden transition-all hover:shadow-md">
          <div className="flex items-center gap-2 border-b border-[#f0f0f0] px-6 py-5">
            <Monitor className="size-4.5 text-[#f97316]" />
            <div>
              <h2 className="text-lg font-serif font-semibold text-[#1a1a1a]">Top Links</h2>
              <p className="text-xs text-[#6b6b6b]">Ranked by click count</p>
            </div>
          </div>
          {links.length === 0 ? (
            <EmptyState message="No links yet. Add some links to your profile." />
          ) : (
            <div className="divide-y divide-[#f0f0f0]">
              {links.slice(0, 6).map((link, i) => {
                const pct =
                  totalClicks > 0
                    ? Math.round((link.clicks / totalClicks) * 100)
                    : 0;
                return (
                    <div
                    key={link.id}
                    className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[#fafafa]/50"
                  >
                    <span className="w-5 text-right text-sm font-bold text-[#b4b0a4]">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-[#1a1a1a]">
                          {link.title}
                        </p>
                        <span className="shrink-0 text-xs font-bold text-[#c2410c]">
                          {link.clicks.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-1.5">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f0f0f0]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-[#f97316] to-[#ea580c]"
                          />
                        </div>
                      </div>
                      <p className="mt-1 truncate text-[11px] font-medium text-[#b4b0a4]">
                        {link.url}
                      </p>
                    </div>
                    <ExternalLink className="size-4 shrink-0 text-[#d8d5ce] transition-colors hover:text-[#6b6b6b] cursor-pointer" />
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Recent Activity Feed */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ delay: 0.2 }}
        className="rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md shadow-sm overflow-hidden"
      >
        <div className="flex items-center gap-2 border-b border-[#f0f0f0] px-6 py-5 bg-[#fafafa]/50">
          <Clock className="size-4.5 text-[#f97316]" />
          <div>
            <h2 className="text-lg font-serif font-semibold text-[#1a1a1a]">
              Recent Activity
            </h2>
            <p className="text-xs text-[#6b6b6b]">
              Last 20 clicks on your links
            </p>
          </div>
        </div>
        {clicks.length === 0 ? (
          <EmptyState message="No activity recorded yet." />
        ) : (
          <div className="divide-y divide-[#f0f0f0]">
            {clicks.slice(0, 20).map((click) => {
              const timeAgo = formatDistanceToNow(new Date(click.createdAt), { addSuffix: true });
              return (
                <div
                  key={click.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-4 transition-colors hover:bg-[#fafafa]/50"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="size-2 shrink-0 rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                      <p className="truncate text-sm font-medium text-[#1a1a1a]">
                        {click.link.title}
                      </p>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-[#6b6b6b]">
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
                  <time className="shrink-0 text-[11px] font-medium text-[#b4b0a4]" title={click.createdAtFormatted}>
                    {timeAgo}
                  </time>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
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
    <div className="group relative overflow-hidden rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md p-6 shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`absolute -right-4 -top-4 size-24 rounded-full opacity-5 blur-2xl bg-[#ea580c]`}
      />
      <div
        className={`inline-flex size-12 items-center justify-center rounded-2xl bg-[#fafafa] border border-[#f0f0f0] text-[#1a1a1a]`}
      >
        {icon}
      </div>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#b4b0a4]">
        {label}
      </p>
      <p className="mt-1 text-4xl font-serif font-semibold tracking-tight text-[#1a1a1a]">
        {value}
      </p>
      <p className="mt-1 text-xs text-[#6b6b6b] font-medium">{sub}</p>
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
    <div className="rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 border-b border-[#f0f0f0] px-6 py-5">
        {icon}
        <div>
          <h2 className="text-lg font-serif font-semibold text-[#1a1a1a]">{title}</h2>
          <p className="text-xs text-[#6b6b6b]">{subtitle}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
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
