import React from "react";
import { ExternalLink } from "lucide-react";

export interface LinkPreviewData {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  ogSiteName?: string | null;
  favicon?: string | null;
  active: boolean;
}

interface LinkPreviewCardProps {
  link: LinkPreviewData;
  btnColor: string;
  btnTextColor: string;
  btnRadius: string;
  accColor: string;
}

export function LinkPreviewCard({
  link,
  btnColor,
  btnTextColor,
  btnRadius,
  accColor,
}: LinkPreviewCardProps) {
  if (!link.active) return null;

  let hostname = link.url;
  try {
    hostname = new URL(link.url).hostname.replace(/^www\./, "");
  } catch (e) {
    // ignore invalid URLs formatting
  }

  const displayTitle = link.ogTitle || link.title;
  const displayDesc = link.ogDescription || link.description;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-row overflow-hidden transition-all hover:brightness-110 shadow-sm hover:shadow-md border border-black/5 h-[60px]"
      style={{
        backgroundColor: btnColor,
        borderRadius: btnRadius,
        color: btnTextColor,
      }}
    >
      {link.ogImage ? (
        <>
          <div className="relative w-[35%] shrink-0 border-r border-black/10 overflow-hidden bg-black/5">
            <img
              src={link.ogImage}
              alt={displayTitle}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {link.favicon && (
              <div className="absolute bottom-1 left-1 size-4 rounded bg-white p-0.5 shadow-sm ring-1 ring-black/5">
                <img
                  src={link.favicon}
                  alt="Favicon"
                  className="w-full h-full object-contain rounded-[2px]"
                />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-center px-3 py-1.5 bg-black/5 w-[65%]">
            <div className="flex items-center justify-between gap-2 text-left">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] sm:text-xs font-semibold">{displayTitle}</p>
                <div className="flex items-center gap-1 opacity-50 mt-0.5">
                  <ExternalLink className="size-2.5 shrink-0" />
                  <p className="truncate text-[8px] sm:text-[9px] uppercase tracking-wider">
                    {link.ogSiteName || hostname}
                  </p>
                </div>
              </div>
              {/* <div
                className="flex size-6 flex-none items-center justify-center rounded-full opacity-60 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: accColor }}
              >
                <ExternalLink
                  className="size-3"
                  style={{ color: btnTextColor }}
                />
              </div> */}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center px-3 py-1.5">
          {link.favicon && (
            <div className="mr-2 size-6 shrink-0 overflow-hidden rounded-[4px] bg-black/5 p-0.5">
              <img
                src={link.favicon}
                alt="Favicon"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="min-w-0 flex-1 pr-2">
            <p className="truncate text-[11px] sm:text-xs font-semibold">{displayTitle}</p>
            <p className="truncate text-[8px] sm:text-[9px] opacity-50 mt-0.5 uppercase tracking-wider">
              {link.ogSiteName || hostname}
            </p>
          </div>
          {/* <div
            className="flex size-6 flex-none items-center justify-center rounded-full opacity-60 transition-opacity group-hover:opacity-100"
            style={{ backgroundColor: accColor }}
          >
            <ExternalLink
              className="size-3"
              style={{ color: btnTextColor }}
            />
          </div> */}
        </div>
      )}
    </a>
  );
}
