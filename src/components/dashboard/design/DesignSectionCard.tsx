"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface DesignSectionCardProps extends HTMLMotionProps<"section"> {
  title: string;
  description?: string;
  children: ReactNode;
}

export function DesignSectionCard({ title, description, children, className = "", ...props }: DesignSectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-xl shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      <div className="border-b border-[#f0f0f0] px-6 py-5">
        <h2 className="text-lg font-serif font-semibold text-[#1a1a1a]">{title}</h2>
        {description && <p className="text-sm font-medium text-[#6b6b6b] mt-1">{description}</p>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </motion.section>
  );
}
