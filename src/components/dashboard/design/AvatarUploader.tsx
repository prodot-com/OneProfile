"use client";

import { useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, X, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AvatarUploaderProps {
  value: string;
  fallbackLetter: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<boolean>;
}

export function AvatarUploader({ value, fallbackLetter, onChange, onUpload }: AvatarUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    await onUpload(file);
    setUploading(false);
  };

  return (
    <div
      className={`relative size-28 overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow-xl transition-all ring-1 ring-black/5 hover:border-zinc-50 ${
        isDragging ? "ring-4 ring-zinc-900 ring-offset-2" : ""
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
            <img src={value} alt="Avatar" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex flex-col items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="flex size-8 items-center justify-center rounded-full bg-white text-zinc-900 transition-transform hover:scale-110 active:scale-95"
                title="Replace Avatar"
              >
                {uploading ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                disabled={uploading}
                className="flex size-7 items-center justify-center rounded-full bg-red-500 text-white transition-transform hover:scale-110 hover:bg-red-600 active:scale-95"
                title="Remove"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-transparent bg-zinc-100 transition-colors cursor-pointer hover:bg-zinc-200"
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? (
              <Loader2 className="size-7 animate-spin text-zinc-400" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-serif font-bold text-zinc-300">
                {fallbackLetter.charAt(0).toUpperCase()}
              </div>
            )}
            
            {/* Hover state for empty */}
            {!uploading && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100 text-white">
                 <Camera className="size-6" />
               </div>
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
