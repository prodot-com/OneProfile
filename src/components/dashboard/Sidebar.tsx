"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { label: "Links", href: "/dashboard/links", icon: LinksIcon },
    { label: "Appearance", href: "/dashboard/appearance", icon: AppearanceIcon },
    { label: "Analytics", href: "/dashboard/analytics", icon: AnalyticsIcon },
    { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
  ];

  return (
    <aside className={`w-64 flex-col border-r border-zinc-200/70 bg-white ${className}`}>
      <div className="h-16 flex items-center px-6 border-b border-zinc-200/70">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-lg">
            o
          </div>
          <span className="font-semibold text-lg tracking-tight">OneProfile</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-zinc-100 text-zinc-900 font-medium" 
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-zinc-900" : "text-zinc-400"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-zinc-200/70 text-xs text-zinc-400 text-center">
        OneProfile v1.0.0
      </div>
    </aside>
  );
}

// Inline SVGs for no-dependency setup
function DashboardIcon(props: any) { return <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>; }
function LinksIcon(props: any) { return <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>; }
function AppearanceIcon(props: any) { return <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>; }
function AnalyticsIcon(props: any) { return <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>; }
function SettingsIcon(props: any) { return <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.342 3.9a3.346 3.346 0 013.316 0l1.45 1.07a3.346 3.346 0 003.111.45l1.642-.64a3.346 3.346 0 014.28 2.05l.59 1.69a3.346 3.346 0 002.32 2.22l1.75.46a3.346 3.346 0 012.35 4.02l-.53 1.7a3.346 3.346 0 001.07 3.12l1.32 1.25a3.346 3.346 0 01-.19 4.75l-1.46 1.05a3.346 3.346 0 00-1.4 2.8l.19 1.8a3.346 3.346 0 01-3.14 3.73l-1.8-.1a3.346 3.346 0 00-2.83 1.48l-.9 1.57a3.346 3.346 0 01-4.48 1.19l-1.55-.95a3.346 3.346 0 00-3.14-.15l-1.28 1.27a3.346 3.346 0 01-4.73-.24l-.86-1.58a3.346 3.346 0 00-2.6-1.53l-1.78.36a3.346 3.346 0 01-3.78-2.92l-.3-1.77a3.346 3.346 0 00-1.92-2.52l-1.68-.62a3.346 3.346 0 01-1.95-4.4l1.1-1.4a3.346 3.346 0 00-.58-3.1l-1.07-1.44a3.346 3.346 0 011.35-4.55l1.67.62a3.346 3.346 0 002.6-1.52l.85-1.59a3.346 3.346 0 014.73-.24l1.28 1.28a3.346 3.346 0 003.14-.14l1.55-.95a3.346 3.346 0 014.48 1.19l.9 1.57a3.346 3.346 0 002.83 1.48l1.8-.1a3.346 3.346 0 013.14 3.73l-.19 1.8a3.346 3.346 0 001.4 2.8l1.46 1.05a3.346 3.346 0 01.19 4.75l-1.32 1.25a3.346 3.346 0 00-1.07 3.12l.53 1.7a3.346 3.346 0 01-2.35 4.02l-1.75.46a3.346 3.346 0 00-2.32 2.22l-.59 1.69a3.346 3.346 0 01-4.28 2.05l-1.642-.64a3.346 3.346 0 00-3.111.45l-1.45 1.07a3.346 3.346 0 01-3.316 0L10.342 3.9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }