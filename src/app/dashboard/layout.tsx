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

  return (
    <div className="flex h-screen bg-zinc-50/50 overflow-hidden text-zinc-900 font-sans">
      <Sidebar className="hidden md:flex" />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Topbar profile={profile} />
        <main className="flex-1 relative flex flex-col max-w-full overflow-y-auto lg:has-[.split-layout]:overflow-hidden px-4 md:px-10 lg:px-12 py-8 lg:has-[.split-layout]:px-0 lg:has-[.split-layout]:py-0">
          <div className="mx-auto w-full max-w-6xl space-y-8 pb-16 lg:has-[.split-layout]:max-w-none lg:has-[.split-layout]:space-y-0 lg:has-[.split-layout]:pb-0 lg:has-[.split-layout]:h-full lg:has-[.split-layout]:flex lg:has-[.split-layout]:flex-col lg:has-[.split-layout]:min-h-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
