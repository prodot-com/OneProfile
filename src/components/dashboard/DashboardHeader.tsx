"use client";

import { Profile } from "@prisma/client";
import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import QRCode from "qrcode";
import QRModal from "./qrModal";

interface DashboardProps {
  profile: Profile;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardHeader({ profile }: DashboardProps) {
  const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${profile.username}`;
  const [copied, setCopied] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(profileUrl).then(setQrCode);
  }, [profileUrl]);

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${profileUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-[#1a1a1a]">
          {getGreeting()}, <span className="italic text-[#f97316]">{profile.displayName.split(" ")[0]}</span>
        </h1>
        <p className="text-[#6b6b6b] mt-2 text-lg">
          Here&apos;s an overview of your profile performance.
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-white/80 backdrop-blur-md border border-[#e5e2dc] p-3 md:p-4 rounded-[1.25rem] shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:-translate-y-0.5">
        <img
          src={profile?.avatar || "/avatar.png"}
          alt={profile.displayName}
          className="w-12 h-12 rounded-full border border-[#f0f0f0] bg-[#fafafa] object-cover shadow-sm"
        />
        <div className="flex-1 pr-3">
          <div className="font-semibold text-[#1a1a1a] text-sm">
            {profile.displayName}
          </div>
          <div className="text-xs text-[#6b6b6b]">{profileUrl}</div>
        </div>
        <div className="flex items-center gap-1.5 pl-3 border-l border-[#e5e2dc]">
          {qrCode && (
            <img
              src={qrCode}
              alt="QR"
              onClick={() => setShowQR(true)}
              className="w-12 h-12 rounded-lg cursor-pointer hover:scale-105 transition"
            />
          )}
          <button
            onClick={copyUrl}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              copied
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "text-[#6b6b6b] border border-transparent hover:text-[#1a1a1a] hover:bg-white hover:border-[#e5e2dc] hover:shadow-sm"
            }`}
            aria-label="Copy URL"
            title={copied ? "Copied!" : "Copy URL"}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-all whitespace-nowrap active:scale-[0.98] shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Visit
          </a>
        </div>
      </div>
      <QRModal
        open={showQR}
        onClose={() => setShowQR(false)}
        profileUrl={profileUrl}
        username={profile.username}
      />
    </div>
  );
}
