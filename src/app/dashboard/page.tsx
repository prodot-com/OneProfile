// import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LinksSection from "@/components/dashboard/LinksSection";
import QuickActions from "@/components/dashboard/QuickActions";
import { requireUserAndProfile } from "@/lib/session";
// import RecentActivity from "@/components/dashboard/RecentActivity";
// import StatsCards from "@/components/dashboard/StatsCards";


// Simulated Prisma data fetch
async function getDashboardData() {
  return {
    profile: {
      displayName: "Alex Developer",
      username: "alexdev",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=alexdev",
      bio: "Full-stack engineer building open source tools.",
      website: "https://alex.dev",
      verified: true,
    },
    stats: {
      views: 12450,
      clicks: 8230,
      ctr: 66.1,
      activeLinks: 12,
    },
    links: [
      { id: "1", title: "Personal Portfolio", url: "https://alex.dev", visibility: "Public", clicks: 3450 },
      { id: "2", title: "GitHub Profile", url: "https://github.com/alexdev", visibility: "Public", clicks: 2100 },
      { id: "3", title: "Next.js Dashboard Template", url: "https://github.com/alexdev/oneprofile", visibility: "Public", clicks: 1540 },
      { id: "4", title: "Private Project Draft", url: "https://draft.alex.dev", visibility: "Hidden", clicks: 0 },
    ]
  };
}

export default async function DashboardPage() {
  const { user, profile } = await requireUserAndProfile();
  const data =await getDashboardData()

  return (
    <>
      <DashboardHeader profile={profile} />
      <QuickActions />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <LinksSection initialLinks={data.links} />
        </div>
        <div className="space-y-8">
        </div>
      </div>
    </>
  );
}