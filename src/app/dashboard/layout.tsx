import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { requireUserAndProfile } from "@/lib/session";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, profile } = await requireUserAndProfile();
  console.log("Layout profile:", profile);
  return (
    <div className="flex h-screen bg-zinc-50/50 overflow-hidden text-zinc-900 font-sans">
      <Sidebar profile={profile} className="hidden md:flex" />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Topbar profile={profile} />
        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-10 lg:px-12">
          <div className="max-w-6xl mx-auto space-y-8 pb-16">{children}</div>
        </main>
      </div>
    </div>
  );
}
