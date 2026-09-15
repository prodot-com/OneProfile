"use client";

import { createProfile } from "@/services/profile";
import { checkUsername } from "@/services/profile";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  User,
  FileText,
  Camera,
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
  Loader2,
  AlertCircle,
  Globe,
  AtSign,
} from "lucide-react";
import Logo from "@/lib/logo";

const TOTAL_STEPS = 5;

const steps = [
  { label: "Welcome", icon: User },
  { label: "Username", icon: AtSign },
  { label: "Profile", icon: FileText },
  { label: "Avatar", icon: Camera },
  { label: "Review", icon: ClipboardCheck },
];

const pageVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    displayName: "",
    bio: "",
    website: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Username availability
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");
  const [usernameError, setUsernameError] = useState("");

  const username = useMemo(() => {
    return form.username.toLowerCase().replace(/[^a-z0-9-]/g, "");
  }, [form.username]);

  const usernameValid = username.length >= 3 && username.length <= 30;

  // Debounced username check
  useEffect(() => {
    if (!usernameValid) {
      setUsernameStatus(username.length > 0 ? "invalid" : "idle");
      setUsernameError(
        username.length > 0 ? "Username must be 3–30 characters." : ""
      );
      return;
    }

    setUsernameStatus("checking");
    setUsernameError("");

    const timer = setTimeout(async () => {
      try {
        const result = await checkUsername(username);
        if (result.available) {
          setUsernameStatus("available");
          setUsernameError("");
        } else {
          setUsernameStatus("taken");
          setUsernameError(result.error || "Username not available.");
        }
      } catch {
        setUsernameStatus("idle");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username, usernameValid]);

  function next() {
    if (step === 2 && usernameStatus !== "available") return;
    if (step === 3 && !form.displayName.trim()) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    setError("");
  }

  function back() {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
      setError("");
    }
  }

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const handleAvatarFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }, []);

  function removeAvatar() {
    setAvatarFile(null);
    setAvatarPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function finishOnboarding() {
    setLoading(true);
    setError("");

    try {
      let avatarUrl = "";

      if (avatarFile) {
        const body = new FormData();
        body.append("file", avatarFile);

        const upload = await fetch("/api/upload", {
          method: "POST",
          body,
        });

        const image = await upload.json();

        if (!image.success) {
          throw new Error("Image upload failed.");
        }

        avatarUrl = image.url;
      }

      const result = await createProfile({
        username,
        displayName: form.displayName,
        bio: form.bio,
        website: form.website,
        avatar: avatarUrl,
        theme: "DEFAULT",
      });

      if (!result.success) {
        setError(result.error || "Something went wrong.");
        return;
      }

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const canContinue =
    (step === 1) ||
    (step === 2 && usernameStatus === "available") ||
    (step === 3 && form.displayName.trim().length > 0) ||
    (step === 4) ||
    (step === 5);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#1a1a1a] selection:bg-[#f97316]/20">
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[url('/back.png')] bg-cover bg-top opacity-[0.08]" />
        <div className="absolute top-[300px] left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#faf9f6]" />
      </div>

      {/* Header */}
      <header className="border-b border-[#e5e2dc] bg-white/60 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Logo className="h-8" showText />
          <span className="text-sm font-medium text-[#b4b0a4]">
            Step {step} of {TOTAL_STEPS}
          </span>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="mx-auto mt-8 max-w-3xl px-6">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => {
            const stepNum = i + 1;
            const isCompleted = step > stepNum;
            const isActive = step === stepNum;
            const Icon = s.icon;

            return (
              <div key={s.label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${isCompleted
                        ? "bg-[#f97316] text-white shadow-md shadow-[#f97316]/25"
                        : isActive
                          ? "bg-white border-2 border-[#f97316] text-[#f97316] shadow-md"
                          : "bg-[#f0ede8] text-[#b4b0a4]"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium hidden sm:block ${
                      isActive ? "text-[#f97316]" : isCompleted ? "text-[#1a1a1a]" : "text-[#b4b0a4]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-3 mt-[-18px] sm:mt-[-22px] rounded-full transition-colors duration-300 ${
                      step > stepNum ? "bg-[#f97316]" : "bg-[#e5e2dc]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto mt-8 max-w-2xl px-6 pb-16">
        <div className="rounded-[1.5rem] border border-[#e5e2dc] bg-white/90 backdrop-blur-md p-8 md:p-10 shadow-xl">
          {/* Error toast */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
                <button onClick={() => setError("")} className="ml-auto">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait" custom={direction}>
            {/* ── STEP 1: Welcome ── */}
            {step === 1 && (
              <motion.section
                key="step1"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#fb923c] to-[#f97316] flex items-center justify-center shadow-lg shadow-[#f97316]/25">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1a1a]">
                    Welcome to OneProfile
                  </h2>
                  <p className="mt-3 text-lg text-[#6b6b6b]">
                    Let&apos;s build your public profile. It only takes a minute.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e5e2dc] bg-[#fdfcfa] p-6">
                  <h3 className="font-serif font-semibold text-[#1a1a1a]">
                    You&apos;ll set up
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      "A unique username",
                      "Your display name & bio",
                      "A profile picture",
                      "Review & launch",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[#6b6b6b]">
                        <div className="w-5 h-5 rounded-full bg-[#f97316]/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-[#f97316]" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={next}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1a1a1a] px-6 py-3.5 font-medium text-white transition-all hover:bg-[#333] hover:shadow-lg active:scale-[0.98]"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </motion.section>
            )}

            {/* ── STEP 2: Username ── */}
            {step === 2 && (
              <motion.section
                key="step2"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a1a1a]">
                    Choose your username
                  </h2>
                  <p className="mt-2 text-[#6b6b6b]">
                    This becomes your public profile URL.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">
                    Username
                  </label>
                  <div className="flex overflow-hidden rounded-xl border border-[#e5e2dc] focus-within:ring-2 focus-within:ring-[#f97316]/30 focus-within:border-[#f97316] transition-all">
                    <div className="border-r border-[#e5e2dc] bg-[#fdfcfa] px-4 py-3 text-[#b4b0a4] font-mono text-sm">
                      @
                    </div>
                    <input
                      value={form.username}
                      onChange={(e) => update("username", e.target.value)}
                      placeholder="yourname"
                      className="w-full px-4 py-3 outline-none bg-transparent text-[#1a1a1a] placeholder:text-[#ccc]"
                    />
                    <div className="flex items-center pr-3">
                      {usernameStatus === "checking" && (
                        <Loader2 className="w-4 h-4 text-[#b4b0a4] animate-spin" />
                      )}
                      {usernameStatus === "available" && (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                      )}
                      {(usernameStatus === "taken" || usernameStatus === "invalid") && (
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                          <X className="w-3 h-3 text-red-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* URL Preview */}
                  <div className="mt-3 rounded-xl bg-[#fdfcfa] border border-[#e5e2dc] p-4">
                    <p className="text-xs uppercase tracking-wider text-[#b4b0a4] font-medium">
                      Public URL
                    </p>
                    <p className="mt-1 font-medium text-[#1a1a1a]">
                      oneprofile.app/
                      <span className="text-[#f97316]">
                        {username || "username"}
                      </span>
                    </p>
                  </div>

                  {/* Status message */}
                  {usernameError && (
                    <p className="mt-3 text-sm text-red-500 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {usernameError}
                    </p>
                  )}
                  {usernameStatus === "available" && (
                    <p className="mt-3 text-sm text-emerald-600 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      Username is available!
                    </p>
                  )}
                  {usernameStatus === "checking" && (
                    <p className="mt-3 text-sm text-[#b4b0a4] flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Checking availability…
                    </p>
                  )}
                </div>

                <StepNav
                  onBack={back}
                  onNext={next}
                  nextDisabled={usernameStatus !== "available"}
                  nextLabel="Continue"
                />
              </motion.section>
            )}

            {/* ── STEP 3: Profile Info ── */}
            {step === 3 && (
              <motion.section
                key="step3"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a1a1a]">
                    Tell us about yourself
                  </h2>
                  <p className="mt-2 text-[#6b6b6b]">
                    This information appears on your profile.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">
                      Display Name <span className="text-[#f97316]">*</span>
                    </label>
                    <input
                      value={form.displayName}
                      onChange={(e) => update("displayName", e.target.value)}
                      placeholder="Probal Ghosh"
                      className="w-full rounded-xl border border-[#e5e2dc] px-4 py-3 outline-none bg-transparent
                        focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all
                        text-[#1a1a1a] placeholder:text-[#ccc]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-[#1a1a1a]">Bio</label>
                      <span className="text-xs text-[#b4b0a4]">
                        {form.bio.length}/160
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      maxLength={160}
                      value={form.bio}
                      onChange={(e) => update("bio", e.target.value)}
                      placeholder="Building open-source products."
                      className="w-full resize-none rounded-xl border border-[#e5e2dc] px-4 py-3 outline-none bg-transparent
                        focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316] transition-all
                        text-[#1a1a1a] placeholder:text-[#ccc]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">
                      Website
                    </label>
                    <div className="flex overflow-hidden rounded-xl border border-[#e5e2dc] focus-within:ring-2 focus-within:ring-[#f97316]/30 focus-within:border-[#f97316] transition-all">
                      <div className="border-r border-[#e5e2dc] bg-[#fdfcfa] px-3 py-3 flex items-center">
                        <Globe className="w-4 h-4 text-[#b4b0a4]" />
                      </div>
                      <input
                        value={form.website}
                        onChange={(e) => update("website", e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 outline-none bg-transparent text-[#1a1a1a] placeholder:text-[#ccc]"
                      />
                    </div>
                  </div>
                </div>

                <StepNav
                  onBack={back}
                  onNext={next}
                  nextDisabled={!form.displayName.trim()}
                  nextLabel="Continue"
                />
              </motion.section>
            )}

            {/* ── STEP 4: Avatar ── */}
            {step === 4 && (
              <motion.section
                key="step4"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a1a1a]">
                    Upload your profile picture
                  </h2>
                  <p className="mt-2 text-[#6b6b6b]">
                    This helps people recognize you. You can skip this step.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  {avatarPreview ? (
                    <div className="relative group mb-4">
                      <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#e5e2dc] shadow-lg">
                        <img
                          src={avatarPreview}
                          alt="Avatar Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        onClick={removeAvatar}
                        className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md
                          opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        const file = e.dataTransfer.files[0];
                        if (file) handleAvatarFile(file);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`
                        mb-4 flex h-40 w-40 cursor-pointer flex-col items-center justify-center
                        rounded-full border-2 border-dashed transition-all duration-200
                        ${dragOver
                          ? "border-[#f97316] bg-[#f97316]/5 scale-105"
                          : "border-[#d5d2cc] bg-[#fdfcfa] hover:border-[#f97316] hover:bg-[#f97316]/5"
                        }
                      `}
                    >
                      <Camera className="w-8 h-8 text-[#b4b0a4] mb-2" />
                      <span className="text-xs text-[#b4b0a4] text-center px-4">
                        Click or drag to upload
                      </span>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAvatarFile(file);
                    }}
                  />

                  {!avatarPreview && (
                    <p className="text-xs text-[#b4b0a4] mt-1">
                      JPG, PNG or WebP • Max 5 MB
                    </p>
                  )}
                </div>

                <StepNav
                  onBack={back}
                  onNext={next}
                  nextLabel={avatarPreview ? "Continue" : "Skip for now"}
                />
              </motion.section>
            )}

            {/* ── STEP 5: Review ── */}
            {step === 5 && (
              <motion.section
                key="step5"
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a1a1a]">
                    Review your profile
                  </h2>
                  <p className="mt-2 text-[#6b6b6b]">
                    Everything looks good? Let&apos;s launch your profile.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e5e2dc] bg-[#fdfcfa] p-6">
                  <div className="flex items-center gap-5">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#f0ede8] border-2 border-[#e5e2dc] shrink-0">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt={form.displayName || "Avatar"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-[#b4b0a4]" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl font-serif font-semibold text-[#1a1a1a] truncate">
                        {form.displayName || "Your Name"}
                      </h3>
                      <p className="text-[#f97316] font-medium">
                        @{username || "username"}
                      </p>
                    </div>
                  </div>

                  {form.bio && (
                    <div className="mt-5 pt-5 border-t border-[#e5e2dc]">
                      <p className="text-sm text-[#6b6b6b] leading-relaxed">
                        {form.bio}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 pt-5 border-t border-[#e5e2dc] grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#b4b0a4] font-medium">
                        Public URL
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#1a1a1a]">
                        oneprofile.app/{username}
                      </p>
                    </div>

                    {form.website && (
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#b4b0a4] font-medium">
                          Website
                        </p>
                        <p className="mt-1 text-sm font-medium text-[#1a1a1a] break-all">
                          {form.website}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={back}
                    className="flex items-center gap-2 rounded-xl border border-[#e5e2dc] px-5 py-3 text-sm font-medium text-[#6b6b6b] transition-all hover:bg-[#fdfcfa] hover:border-[#d5d2cc] active:scale-[0.98]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    disabled={loading}
                    onClick={finishOnboarding}
                    className="flex items-center gap-2 rounded-xl px-8 py-3 font-medium text-white transition-all active:scale-[0.98]
                      bg-gradient-to-b from-[#fb923c] via-[#f97316] to-[#c2410c]
                      shadow-[0_8px_24px_rgba(249,115,22,0.3)]
                      hover:brightness-110 hover:shadow-[0_12px_30px_rgba(249,115,22,0.4)]
                      disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating Profile…
                      </>
                    ) : (
                      <>
                        Launch Profile <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

/* ─── Shared step navigation ─── */
function StepNav({
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = "Continue",
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 pt-2">
      <button
        onClick={onBack}
        className="flex items-center gap-2 rounded-xl border border-[#e5e2dc] px-5 py-3 text-sm font-medium text-[#6b6b6b] transition-all hover:bg-[#fdfcfa] hover:border-[#d5d2cc] active:scale-[0.98]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <button
        disabled={nextDisabled}
        onClick={onNext}
        className="flex items-center gap-2 rounded-xl bg-[#1a1a1a] px-6 py-3 text-sm font-medium text-white transition-all
          hover:bg-[#333] hover:shadow-lg active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {nextLabel} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
