"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Undo2, Redo2, RotateCcw } from "lucide-react";

interface StickySaveBarProps {
  onSave: () => void;
  saving: boolean;
  hasUnsavedChanges: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
}

export function StickySaveBar({
  onSave,
  saving,
  hasUnsavedChanges,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
}: StickySaveBarProps) {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky bottom-6 flex items-center justify-between rounded-[2rem] border border-black/10 bg-white/90 p-3 shadow-2xl backdrop-blur-xl mx-4 lg:mx-0 z-50 mt-8"
    >
      <div className="flex items-center gap-2 pl-2">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="flex size-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Undo"
        >
          <Undo2 className="size-4.5" />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className="flex size-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Redo"
        >
          <Redo2 className="size-4.5" />
        </button>
        
        <div className="w-px h-6 bg-zinc-200 mx-1" />
        
        <button
          type="button"
          onClick={onReset}
          className="flex size-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 transition-colors"
          title="Reset to Default"
        >
          <RotateCcw className="size-4.5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <AnimatePresence>
          {/* {hasUnsavedChanges && (
            <motion.span
              initial={{ opacity: 0, scale: 0.95, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 10 }}
              className="text-xs font-semibold text-amber-600 hidden sm:block"
            >
              Unsaved changes
            </motion.span>
          )} */}
        </AnimatePresence>
        <button
          onClick={onSave}
          disabled={saving || !hasUnsavedChanges}
          className="relative overflow-hidden flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.97] disabled:opacity-50 disabled:bg-zinc-900 disabled:active:scale-100"
        >
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <motion.span
              key={hasUnsavedChanges ? "save" : "saved"}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="px-1"
            >
              {hasUnsavedChanges ? "Save" : "Saved"}
            </motion.span>
          )}
        </button>
      </div>
    </motion.div>
  );
}
