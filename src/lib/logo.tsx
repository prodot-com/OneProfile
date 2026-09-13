import React from "react";

interface OneProfileLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function OneProfileLogo({
  className = "h-10",
  size,
  showText = false,
}: OneProfileLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="h-full w-auto"
        style={size ? { width: size, height: size } : undefined}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="oneprofile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#755917" />
            <stop offset="50%" stopColor="#4d3a0d" />
            <stop offset="100%" stopColor="#2a2005" />
          </linearGradient>
        </defs>

        {/* Main "1" shape */}
        <path
          d="M8 7 L14.5 5 L14.5 17.5 C14.5 18.5 13.5 19.5 12.5 19.5 H10 V9 L8 10 Z"
          fill="url(#oneprofile)"
          opacity="0.95"
        />
        {/* Fold accent */}
        <path
          d="M8 7 L10 9 L8 10 Z"
          fill="url(#oneprofile)"
        />
      </svg>
      {showText && (
        <span className="text-2xl font-semibold tracking-tight text-gray-900">
          OneProfile
        </span>
      )}
    </div>
  );
}