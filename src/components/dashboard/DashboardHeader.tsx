"use client";

import { Profile } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import QRCode from "qrcode";
import QRModal from "./qrModal";
import { CopyButton } from "../ui/buttons/copy-button";
import { ThreeDButton } from "../ui/buttons/3d-button";

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
          {getGreeting()},{" "}
          <span className="italic text-[#f97316]">
            {profile.displayName.split(" ")[0]}
          </span>
        </h1>
        <p className="text-[#6b6b6b] mt-2 text-lg">
          Here&apos;s an overview of your profile performance.
        </p>
      </div>

      {/* Profile card */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#e5e2dc] p-3 md:p-4 rounded-lg shadow-sm transition-all hover:shadow-md">
          <img
            src={profile?.avatar || "/avatar.png"}
            alt={profile.displayName}
            className="w-12 h-12 rounded-full border border-[#f0f0f0] bg-[#fafafa] object-cover shadow-sm"
          />
          <div className="flex-col gap-0">
            <div className="font-semibold text-[#1a1a1a] text-sm">
              {profile.displayName}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[12px] text-[#6b6b6b]">
                {`oneprofile.../${profile.username}`}
              </div>
              {/* <button
                onClick={copyUrl}
                className={`rounded-xl transition-all duration-300 ${
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
              </button> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <CopyButton value={profileUrl} className="" />
          <a href={profileUrl} target="_blank">
            <ThreeDButton variant="solid" size="sm" className="shadow-none">
              <ArrowUpRight /> Continue
            </ThreeDButton>
          </a>
        </div>

        <div className="flex items-center border border-[#e5e2dc] p-3 rounded-lg bg-white/80 backdrop-blur-md border border-[#e5e2dc] shadow-sm transition-all hover:shadow-md">
          {qrCode && (
            <img
              src={qrCode}
              alt="QR"
              onClick={() => setShowQR(true)}
              className="w-13 h-13 rounded-lg cursor-pointer hover:scale-105 transition"
            />
          )}

          {/* <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] text-white text-xs font-medium rounded-xl hover:bg-[#333] transition-all whitespace-nowrap active:scale-[0.98] shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Visit
          </a> */}
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
