"use client";

import { Profile } from "@prisma/client";
import { useState, useRef, useEffect } from "react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface topbarProps {
  profile: Profile
}

export default function Topbar({profile}: topbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="h-16 bg-white border-b border-zinc-200/70 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-50">
      <div className="flex items-center gap-4 md:hidden">
        <button
          aria-label="Open Menu"
          className="p-2 -ml-2 rounded-lg text-zinc-500 hover:bg-zinc-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="font-semibold text-lg tracking-tight">OneProfile</span>
      </div>
      <div className="hidden md:block">
        {/* Placeholder for breadcrumbs or context if needed in the future */}
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="relative p-2 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
        >
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <button
            aria-label="User Menu"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="block h-8 w-8 rounded-full overflow-hidden border border-zinc-200 hover:border-zinc-300 transition-colors"
          >
            <img
              src={profile?.avatar || "/avatar.png"}
              alt="User avatar"
              className="w-full h-full object-cover bg-zinc-50"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-zinc-200 shadow-lg py-1 fade-in z-50">
              <div className="px-4 py-2 border-b border-zinc-100">
                <p className="text-sm font-medium text-zinc-900 truncate">
                  {profile?.displayName}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  @{profile?.username}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
