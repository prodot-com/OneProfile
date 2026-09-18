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
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#e5e2dc] p-3 md:p-4 rounded-lg shadow-sm transition-all hover:shadow-md w-full sm:w-auto">
          <img
            src={profile?.avatar || "/avatar.png"}
            alt={profile.displayName}
            className="w-12 h-12 rounded-full border border-[#f0f0f0] bg-[#fafafa] object-cover shadow-sm shrink-0"
          />
          <div className="flex-col gap-0 min-w-0">
            <div className="font-semibold text-[#1a1a1a] text-sm truncate">
              {profile.displayName}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[12px] text-[#6b6b6b] truncate">
                {`oneprofile.../${profile.username}`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full sm:w-auto sm:flex-col sm:items-center">
          <CopyButton value={profileUrl} className="w-full sm:w-auto justify-center" />
          <a href={profileUrl} target="_blank" className="w-full sm:w-auto">
            <ThreeDButton variant="solid" size="sm" className="shadow-none w-full justify-center">
              <ArrowUpRight className="mr-1 h-4 w-4" /> Continue
            </ThreeDButton>
          </a>
        </div>

        <div className="flex items-center border border-[#e5e2dc] p-3 rounded-lg bg-white/80 backdrop-blur-md shadow-sm transition-all hover:shadow-md shrink-0">
          {qrCode && (
            <img
              src={qrCode}
              alt="QR"
              onClick={() => setShowQR(true)}
              className="w-10 h-10 md:w-13 md:h-13 rounded-lg cursor-pointer hover:scale-105 transition"
            />
          )}
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
