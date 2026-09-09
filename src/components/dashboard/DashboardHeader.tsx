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
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          {getGreeting()}, {profile.displayName.split(" ")[0]}
        </h1>
        <p className="text-zinc-500 mt-1">
          Here&apos;s an overview of your profile performance.
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-white border border-zinc-200/80 p-4 rounded-2xl shadow-sm flex items-center gap-4 transition-shadow hover:shadow-md">
        <img
          src={profile?.avatar || "/avatar.png"}
          alt={profile.displayName}
          className="w-11 h-11 rounded-full border border-zinc-100 bg-zinc-50 object-cover"
        />
        <div className="flex-1 pr-3">
          <div className="font-medium text-zinc-900 text-sm">
            {profile.displayName}
          </div>
          <div className="text-xs text-zinc-500">{profileUrl}</div>
        </div>
        <div className="flex items-center gap-1.5 pl-3 border-l border-zinc-100">
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
            className={`p-2 rounded-lg transition-all duration-200 ${
              copied
                ? "bg-emerald-50 text-emerald-600"
                : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50"
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
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 text-white text-xs font-medium rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap"
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
