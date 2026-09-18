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
            className="absolute inset-0 bg-white/10 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-[420px] overflow-hidden rounded-[1.5rem] bg-white/90 shadow-2xl ring-1 ring-white/10"
          >
            <div className="p-6">
              {/* Top line */}
              <div className="flex justify-between items-start">
                <div className="flex size-11 items-center justify-center rounded-[14px] bg-white/5 border border-white/5">
                  <QrCode className="size-5 text-zinc-900" />
                </div>
                <button
                  onClick={onClose}
                  className="flex size-8 items-center justify-center rounded-lg bg-white/5 border border-white/5 text-zinc-900 hover:text-black hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Header */}
              <div className="mt-6 mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-1.5 rounded-full bg-red-500" />
                  {/* <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
                    OneProfile Notice
                  </span> */}
                </div>
                <h2 className="text-2xl font-bold text-black leading-[1.3]">
                  Kindly bookmark your <br /> new <span className="italic text-orange-500">official</span> profile
                </h2>
              </div>


              {/* QR Card */}
              <div className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] mb-4">
                <div className="shrink-0 bg-white p-2 rounded-xl">
                  {qr ? (
                    <img src={qr} alt="QR" className="size-[88px] rounded-lg" />
                  ) : (
                    <div className="size-[88px] rounded-lg bg-zinc-200 animate-pulse" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  
                  <p className="text-[13px] text-zinc-900 leading-snug mb-3">
                    Save this QR & scan to reach the official site if you can't access it.
                  </p>
                  <button
                    onClick={download}
                    className="self-start flex items-center gap-2 px-4 py-1.5 rounded-lg border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-colors text-xs font-semibold cursor-pointer"
                  >
                    <Download className="size-3.5" />
                    Save QR Code
                  </button>
                </div>
              </div>

              {/* Dismiss */}
              <button
                onClick={onClose}
                className="w-full flex justify-between items-center px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm font-medium text-white cursor-pointer mt-1"
              >
                Dismiss
                <span className="text-zinc-600 font-mono text-[10px] tracking-widest">esc</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}