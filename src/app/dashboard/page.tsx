// import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LinksSection from "@/components/dashboard/LinksSection";
import { prisma } from "@/lib/prisma";
// import QuickActions from "@/components/dashboard/QuickActions";
import { requireUserAndProfile } from "@/lib/session";


export default async function DashboardPage() {
  const { user, profile } = await requireUserAndProfile();

  const links = await prisma.link.findMany({
    where: {
      profileId: profile.id,
    },
    orderBy: {
      position: "asc",
    },
  });

  return (
    <>
      <DashboardHeader profile={profile} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <LinksSection initialLinks={links} />
        </div>
        <div className="space-y-8"></div>
      </div>
    </>
  );
}
