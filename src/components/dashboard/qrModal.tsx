"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { X, Download, Copy, Check, QrCode } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  profileUrl: string;
  username: string;
}

export default function QRModal({
  open,
  onClose,
  profileUrl,
  username,
}: Props) {
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;

    QRCode.toDataURL(profileUrl, {
      width: 800,
      margin: 2,
    }).then(setQr);
  }, [open, profileUrl]);

  async function copy() {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    if (!qr) return;
    const a = document.createElement("a");
    a.href = qr;
    a.download = `${username}-qr.png`;
    a.click();
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-[400px] overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5"
          >
            <div className="flex items-center justify-between border-b border-[#e5e2dc] px-6 py-5 bg-[#fafafa]/50">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <QrCode className="size-4" />
                </div>
                <h2 className="text-[17px] font-semibold text-[#1a1a1a]">
                  Share Profile
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-8 flex flex-col items-center bg-white">
              <div className="relative inline-flex p-3 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-black/5 mb-6">
                {qr ? (
                  <img
                    src={qr}
                    alt="QR Code"
                    className="w-48 h-48 rounded-xl"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-xl bg-zinc-50 animate-pulse" />
                )}
              </div>

              <div className="w-full bg-zinc-50 rounded-xl px-4 py-2.5 border border-zinc-100 flex items-center justify-center mb-8">
                <span className="text-[13px] text-zinc-500 truncate select-all">
                  {profileUrl}
                </span>
              </div>

              <div className="flex w-full gap-3">
                <button
                  onClick={copy}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#e5e2dc] bg-white py-3 text-[14px] font-medium text-[#1a1a1a] hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-4 text-emerald-500" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4 text-zinc-400" />
                      Copy Link
                    </>
                  )}
                </button>

                <button
                  onClick={download}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 py-3 text-[14px] font-medium text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-500 hover:shadow-orange-600/25 transition-all cursor-pointer"
                >
                  <Download className="size-4" />
                  Save QR
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}