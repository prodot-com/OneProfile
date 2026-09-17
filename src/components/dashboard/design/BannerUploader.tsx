"use client";

import { useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, X, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BannerUploaderProps {
  value: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<boolean>; 
}

export function BannerUploader({ value, onChange, onUpload }: BannerUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    const success = await onUpload(file);
    if (!success) {
      // Error handling can be bubbled up
    }
    setUploading(false);
  };

  return (
    <div
      className={`relative h-44 sm:h-52 w-full overflow-hidden rounded-[1.5rem] bg-zinc-100 transition-all ${
        isDragging ? "ring-2 ring-zinc-900 ring-offset-2" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      <AnimatePresence>
        {value ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group absolute inset-0"
          >
            <img src={value} alt="Banner" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition-transform hover:scale-105 active:scale-95"
              >
                {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                disabled={uploading}
                className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-red-600 active:scale-95"
              >
                <X className="size-4" />
                Remove
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 bg-zinc-50/50 hover:bg-zinc-50 transition-colors cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? (
              <Loader2 className="size-8 animate-spin text-zinc-400" />
            ) : (
              <>
                <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 mb-3">
                  <UploadCloud className="size-5 text-zinc-500" />
                </div>
                <p className="text-sm font-semibold text-zinc-700">Click or drag banner image</p>
                <p className="text-xs font-medium text-zinc-400 mt-1">1200 x 400px recommended</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
