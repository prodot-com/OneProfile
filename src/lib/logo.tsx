import React from "react";

interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({
  size = 56,
  className = "",
}: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient
          id="oneprofileGradient"
          x1="0"
          y1="0"
          x2="128"
          y2="128"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#755917" />
          <stop offset="55%" stopColor="#4d3a0d" />
          <stop offset="100%" stopColor="#2a2005" />
        </linearGradient>

        <filter
          id="shadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="8"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      {/* Background */}
      <rect
        x="10"
        y="10"
        width="108"
        height="108"
        rx="30"
        fill="url(#oneprofileGradient)"
        filter="url(#shadow)"
      />

      {/* Folded One */}
      <path
        d="M43 38
           L76 28
           L76 92
           C76 98 72 102 66 102
           H54
           V48
           L43 52
           Z"
        fill="white"
      />

      {/* Fold */}
      <path
        d="M43 38
           L54 48
           L43 52
           Z"
        fill="rgba(255,255,255,.55)"
      />
    </svg>
  );
}