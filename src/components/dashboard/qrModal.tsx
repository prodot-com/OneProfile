"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { X, Download, Copy, Check } from "lucide-react";

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

  if (!open) return null;

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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold">
            Your QR Code
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-zinc-100"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center">

          {qr && (
            <img
              src={qr}
              alt="QR Code"
              className="w-64 h-64 rounded-xl border"
            />
          )}

          <p className="mt-5 text-center text-sm text-zinc-500 break-all">
            {profileUrl}
          </p>

          <div className="mt-8 flex w-full gap-3">

            <button
              onClick={copy}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border py-3 hover:bg-zinc-50"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-green-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy Link
                </>
              )}
            </button>

            <button
              onClick={download}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-black text-white py-3 hover:bg-zinc-800"
            >
              <Download className="size-4" />
              Download
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}