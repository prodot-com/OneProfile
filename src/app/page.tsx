"use client";

import { PhoneMockupCard } from "@/components/ui/phoneMockup";
import { authClient } from "@/lib/auth-client";
import Logo from "@/lib/logo";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  ChevronRight,
  FileText,
  GripVertical,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import { LuGithub, LuTwitter, LuYoutube } from "react-icons/lu";
import { FaSpotify, FaXTwitter } from "react-icons/fa6";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const links = [
  {
    label: "Portfolio",
    icon: Briefcase,
    color: "from-sky-500/70 to-sky-100",
  },
  {
    label: "YouTube",
    icon: LuYoutube,
    color: "from-red-100 to-red-500/70",
  },
  {
    label: "Github",
    icon: LuGithub,
    color: "from-black/70 to-neutral-100",
  },
];

export default function Home() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/login");
  };

  const navLinks = ["Features", "How it works", "Pricing"];

  const steps = [
    {
      num: "01",
      title: "Sign up for free",
      description:
        "Create your account in seconds with GitHub. No credit card required.",
    },
    {
      num: "02",
      title: "Add your links",
      description:
        "Drop in your social profiles, websites, and content. Drag to reorder.",
    },
    {
      num: "03",
      title: "Share your profile",
      description:
        "Get a beautiful link page that you can share anywhere. Track every click.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  return (
    <div className="min-h-screen relative text-[#1a1a1a] selection:bg-[#f97316]/20 selection:text-[#1a1a1a]">
      {/* ─── Background Image (hero section only) ─── */}
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden -z-10 pointer-events-none">
        <Image src="/back.png" alt="" fill className="object-cover" priority />
        <div className="absolute bottom-0 h-20 w-full bg-linear-to-t from-white to-transparent" />
      </div>

      <div className="fixed top-0 left-0 flex justify-center items-center w-full mt-10 z-20 px-4">
        <div
          className="w-full max-w-3xl h-[60px] flex items-center justify-between 
          font-mono px-6 bg-white/20 rounded-lg backdrop-blur-md border border-white/30 shadow-lg"
        >
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 flex items-center justify-center">
              <Logo className="h-9 cursor-pointer" />
            </div>

            <div className="flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[18px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors font-serif"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <button
              className="relative z-10 px-5 py-2.5 cursor-pointer
                  rounded-xl text-white font-serif text-[1.1rem] tracking-wide
                  bg-gradient-to-b from-[#fb923c] via-[#f97316] to-[#c2410c]
                  shadow-[0_12px_30px_rgba(249,115,22,0.35)]
                  hover:brightness-110 hover:scale-105 transition-all duration-300"
            >
              Book a demo
            </button>
          </div>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="pt-36 pb-20 lg:pt-44 lg:pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.1] tracking-tight mb-6"
          >
            Build your digital identity.{" "}
            <span className="italic text-[#f97316]">Free.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#6b6b6b] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            OneProfile gives you a single, beautiful link page to connect your
            audiences to all of your content. Customize, analyze, and share —
            entirely for free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={handleSignIn}
              className="px-6 py-3 rounded-lg text-[15px] font-medium bg-[#1a1a1a] text-white hover:bg-[#333] transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#features"
              className="px-6 py-3 rounded-lg text-[15px] font-medium border border-[#d8d5ce] bg-[#ffffff] text-[#6b6b6b] hover:border-[#ccc] hover:text-[#1a1a1a] transition-all"
            >
              Browse Features
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-8 sm:gap-12 mt-16 pt-8"
          >
            {[
              { value: "10K+", label: "Page views" },
              { value: "1K+", label: "Users" },
              { value: "Free", label: "Forever" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1a1a]">
                  {stat.value}
                </p>
                <p className="text-[13px] text-[#000000] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Showcase ─── */}
      <section className="relative py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="flex-1"
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
                Obsessively Detailed.{" "}
                <span className="italic text-[#f97316]">
                  Effortlessly Beautiful.
                </span>
              </h2>
              <p className="text-[#6b6b6b] text-lg leading-relaxed mb-8 max-w-lg">
                Designed with precision, from fonts to spacings to the smallest
                interactions, so your profile page looks as polished as the
                brand it represents.
              </p>
              <button
                onClick={handleSignIn}
                className="inline-flex items-center gap-2 text-[15px] font-medium text-[#f97316] hover:text-[#c2410c] transition-colors group cursor-pointer"
              >
                Create your profile{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
              className="flex-shrink-0"
            >
              <div className="relative w-[280px] sm:w-[300px]">
                <div
                  className="absolute
        left-1/2
        bottom-[-50px]
        -translate-x-1/2
        w-[260px]
        h-[120px]
        rounded-full
        bg-orange-400/45
        blur-[70px]"
                />
                <PhoneMockupCard
                  showDynamicIsland={false}
                  showHomeIndicator={false}
                  variant="purple"
                  className="mx-auto "
                >
                  <div className="w-full h-full bg-purple-100" />
                </PhoneMockupCard>

                <PhoneMockupCard
                  variant="cherry"
                  showHomeIndicator={false}
                  className="absolute top-3 right-0 rotate-2 mx-auto"
                >
                  <div className="w-full h-full bg-pink-100" />
                </PhoneMockupCard>

                <PhoneMockupCard
                  variant="orange"
                  className="absolute top-6 -right-5 rotate-[4deg]"
                >
                  <div className="relative h-full overflow-hidden rounded-[inherit]">
                    {/* Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#fff6e8_0%,#fffaf5_40%,#ffffff_100%)]" />
                    <div className="absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-orange-300/15 blur-3xl" />

                    <div className="relative px-5 pt-16 pb-6">
                      <div className="relative mx-auto mb-4 h-20 w-20">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-orange-500 blur-md opacity-40" />

                        <div className="relative rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-orange-500 p-[2px] shadow-xl">
                          <img
                            src="/avatar.jpeg"
                            alt="Probal"
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>

                        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
                          ✓
                        </div>
                      </div>

                      {/* Name */}
                      <div className="text-center">
                        <h3 className="font-serif text-[17px] font-bold tracking-tight text-neutral-900">
                          Probal Ghosh
                        </h3>

                        <p className="mt-1 text-xs text-neutral-500">
                          Fullstack Engineer
                        </p>
                      </div>

                      <div className="mt-5 space-y-3">
                        {[
                          { label: "Dicord", icon: FaDiscord },
                          { label: "Spotify", icon: FaSpotify },
                          { label: "Twitter", icon: LuTwitter },
                        ].map((item) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.label}
                              className="
              group flex items-center rounded-2xl border border-white/70 bg-white/75
              px-4 py-3 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all
              hover:-translate-y-0.5 hover:shadow-lg
            "
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-50">
                                <Icon className="h-4 w-4 text-orange-600" />
                              </div>

                              <span className="ml-3 flex-1 text-[13px] font-medium text-neutral-800">
                                {item.label}
                              </span>

                              <div className="text-neutral-300 transition group-hover:translate-x-1">
                                →
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </PhoneMockupCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Features — Premium Bento Grid ─── */}
      <section id="features" className="py-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4">
              Everything you need to grow
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
              Powerful tools designed to help you build your digital identity,
              understand your traffic, and engage your audience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* ── Card 1: Premium Themes — Mini Profile Preview ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="group relative bg-[#f3f0ff] rounded-3xl p-8 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle gradient glow on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-200/40 via-transparent to-orange-100/30 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-purple-800 mb-1">
                  Premium Themes
                </h3>
                <p className="text-[#6b6b6b] text-[13px] leading-relaxed mb-6">
                  Customize every detail to match your brand perfectly.
                </p>
              </div>

              {/* Visual: Animated mini-profile cards cycling themes */}
              <div className="relative z-10 mt-auto flex flex-col items-center">
                {[
                  {
                    bg: "from-orange-50 to-amber-50",
                    accent: "#f97316",
                    ring: "ring-orange-200",
                    name: "Sunset",
                  },
                  {
                    bg: "from-violet-50 to-purple-50",
                    accent: "#8b5cf6",
                    ring: "ring-purple-200",
                    name: "Lavender",
                  },
                  {
                    bg: "from-emerald-50 to-teal-50",
                    accent: "#10b981",
                    ring: "ring-emerald-200",
                    name: "Emerald",
                  },
                ].map((theme, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 - i * 0.04 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.15,
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className={`w-full max-w-[220px] bg-gradient-to-br ${theme.bg} rounded-2xl p-3 shadow-sm border border-white/60 ${i > 0 ? "-mt-8" : ""}`}
                    style={{ zIndex: 3 - i }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div
                        className={`w-7 h-7 rounded-full ring-2 ${theme.ring}`}
                        style={{ backgroundColor: theme.accent }}
                      />
                      <div>
                        <div className="h-2 w-16 rounded-full bg-black/10" />
                        <div className="h-1.5 w-10 rounded-full bg-black/5 mt-1" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div
                        className="h-6 w-full rounded-lg"
                        style={{ backgroundColor: theme.accent + "18" }}
                      >
                        <div
                          className="h-full flex items-center justify-center text-[9px] font-semibold"
                          style={{ color: theme.accent }}
                        >
                          {theme.name}
                        </div>
                      </div>
                      <div className="h-6 w-full rounded-lg bg-black/[0.03]" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Card 2: Deep Analytics — Live Chart + Counters ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="group relative bg-[#eff6ff] rounded-3xl p-8 flex flex-col lg:col-span-2 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-200/30 via-transparent to-cyan-100/20 pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-blue-800 mb-1">
                    Deep Analytics
                  </h3>
                  <p className="text-[#6b6b6b] text-[13px] leading-relaxed max-w-sm">
                    Real-time insights, click tracking, and viewer demographics
                    at a glance.
                  </p>
                </div>
                {/* Live counters */}
                <div className="flex gap-4">
                  {[
                    { label: "Views", value: "12.4k", color: "text-blue-600" },
                    {
                      label: "Clicks",
                      value: "3.2k",
                      color: "text-indigo-600",
                    },
                    { label: "CTR", value: "26%", color: "text-cyan-600" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.5 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="text-center bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm"
                    >
                      <div className={`text-lg font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-[#6b6b6b] font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual: Animated area chart using SVG */}
              <div className="relative z-10 mt-auto h-32 w-full">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 120"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  {/* Grid lines */}
                  {[30, 60, 90].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="400"
                      y2={y}
                      stroke="#bfdbfe"
                      strokeWidth="0.5"
                      strokeDasharray="4 4"
                    />
                  ))}
                  {/* Area fill */}
                  <motion.path
                    d="M0,100 C30,90 60,85 90,70 C120,55 150,45 180,50 C210,55 240,30 270,25 C300,20 330,35 360,15 C375,10 390,8 400,5 L400,120 L0,120 Z"
                    fill="url(#areaGradient)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                  {/* Line */}
                  <motion.path
                    d="M0,100 C30,90 60,85 90,70 C120,55 150,45 180,50 C210,55 240,30 270,25 C300,20 330,35 360,15 C375,10 390,8 400,5"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
                  />
                  {/* Glowing dot at end */}
                  <motion.circle
                    cx="400"
                    cy="5"
                    r="4"
                    fill="#3b82f6"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.8, type: "spring", stiffness: 300 }}
                  />
                  <motion.circle
                    cx="400"
                    cy="5"
                    r="8"
                    fill="#3b82f6"
                    opacity={0.2}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                  />
                  <defs>
                    <linearGradient
                      id="areaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                        stopOpacity="0.02"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* ── Card 3: Lightning Fast — Circular Gauge ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
              className="group relative bg-[#fff1f2] rounded-3xl p-8 flex flex-col items-center overflow-hidden"
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-rose-200/30 via-transparent to-pink-100/20 pointer-events-none" />

              <div className="relative z-10 self-start mb-4">
                <h3 className="font-serif text-2xl text-rose-700 mb-1">
                  Lightning Fast
                </h3>
                <p className="text-[#6b6b6b] text-[13px] leading-relaxed">
                  Optimized for speed & SEO. Every millisecond counts.
                </p>
              </div>

              {/* Visual: Circular speed gauge */}
              <div className="relative z-10 mt-auto flex flex-col items-center">
                <div className="relative w-28 h-28">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="#fecdd3"
                      strokeWidth="6"
                      fill="none"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={264}
                      initial={{ strokeDashoffset: 264 }}
                      whileInView={{ strokeDashoffset: 264 * 0.02 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.4,
                        duration: 1.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                    <defs>
                      <linearGradient
                        id="gaugeGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#fb7185" />
                        <stop offset="100%" stopColor="#f43f5e" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-2xl font-bold text-rose-600"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 }}
                    >
                      98
                    </motion.span>
                  </div>
                </div>
                <motion.span
                  className="text-[11px] font-medium text-[#6b6b6b] mt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                >
                  PageSpeed Score
                </motion.span>
              </div>
            </motion.div>

            {/* ── Card 4: Drag & Drop — Animated Reorder ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={3}
              className="group relative bg-[#fff7ed] rounded-3xl p-8 flex flex-col overflow-hidden"
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-200/30 via-transparent to-orange-100/20 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-amber-800 mb-1">
                  Drag & Drop
                </h3>
                <p className="text-[#6b6b6b] text-[13px] leading-relaxed mb-5">
                  Reorder links effortlessly with fluid drag-and-drop
                  interactions.
                </p>
              </div>

              {/* Visual: Animated link pills with reorder effect */}
              <div className="relative z-10 mt-auto flex flex-col gap-2.5">
                {links.map(({ label, icon: Icon, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.12,
                      type: "spring",
                      stiffness: 150,
                      damping: 15,
                    }}
                    className={`group/pill relative overflow-hidden rounded-2xl bg-gradient-to-r ${color} backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] cursor-grab active:cursor-grabbing`}
                  >
                    <div className="flex items-center px-4 py-3">
                      <GripVertical className="h-4 w-4 text-neutral-300 group-hover/pill:text-neutral-500 transition" />
                      <div className="ml-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                        <Icon className="h-4 w-4 text-neutral-700" />
                      </div>
                      <p className="ml-3 font-medium text-sm text-neutral-900">
                        {label}
                      </p>
                      <ChevronRight className="ml-auto h-4 w-4 text-neutral-400 transition group-hover/pill:translate-x-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Card 5: Social Integration — Orbiting Icons ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={4}
              className="group relative bg-[#f0fdf4] rounded-3xl p-8 flex flex-col overflow-hidden"
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-200/30 via-transparent to-teal-100/20 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-emerald-800 mb-1">
                  Social Integration
                </h3>
                <p className="text-[#6b6b6b] text-[13px] leading-relaxed mb-4">
                  Connect all your profiles in one beautiful, unified hub.
                </p>
              </div>

              {/* Visual: Orbiting social icons around a center hub */}
              <div className="relative z-10 mt-auto flex items-center justify-center py-4">
                <div className="relative w-40 h-40">
                  {/* Center hub */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-emerald-100">
                    <Sparkles className="w-6 h-6 text-emerald-500" />
                  </div>

                  {/* Orbiting icons */}
                  {[
                    { Icon: LuGithub, bg: "#18181b", angle: 0 },
                    { Icon: FaXTwitter, bg: "#000000", angle: 72 },
                    { Icon: FaInstagram, bg: "#E4405F", angle: 144 },
                    { Icon: FaLinkedinIn, bg: "#0A66C2", angle: 216 },
                    { Icon: FaYoutube, bg: "#FF0000", angle: 288 },
                  ].map(({ Icon, bg, angle }, i) => {
                    const radius = 62;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.5 + i * 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 12,
                        }}
                        className="absolute top-1/2 left-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                        style={{
                          backgroundColor: bg,
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.div>
                    );
                  })}

                  {/* Connecting circle ring */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] rounded-full border border-dashed border-emerald-200"
                    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
                    viewport={{ once: true }}
                    transition={{
                      opacity: { delay: 0.3 },
                      scale: { delay: 0.3, duration: 0.6 },
                      rotate: {
                        delay: 0.3,
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section
        id="how-it-works"
        className="py-24 px-6 border-t border-[#e5e2dc] bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4">
              How it works
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-xl mx-auto">
              Three simple steps to your own link page.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
                className="text-center md:text-left"
              >
                <div className="font-serif text-5xl text-[#e5e2dc] font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[#6b6b6b] text-[14px] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-22 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="max-w-5xl mx-auto relative overflow-hidden rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          {/* Background image mimicking the sky */}
          <div className="absolute inset-0 -z-20 pointer-events-none">
            <Image src="/back.png" alt="" fill className="object-cover" />
          </div>
          {/* Light overlay to match image vibrancy & readability */}
          <div className="absolute inset-0 bg-linear-to-r from-white to-transparent -z-10 pointer-events-none" />

          {/* Left Text Content */}
          <div className="flex-1 text-left relative z-10">
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] font-semibold text-[#1a1a1a] mb-4 tracking-tight">
              Help me build the <br /> ultimate workspace.
            </h2>

            <p className="text-[#1a1a1a]/80 text-lg max-w-lg leading-7">
              OneProfile is independently crafted to stay simple, focused, and
              free of distractions. Your support keeps the servers running,
              funds new focus tools, and helps us build a quieter web—one
              feature at a time.
            </p>
          </div>

          {/* Right Buttons */}
          <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-3 relative z-10">
            <a
              href="https://github.com/sponsors/prodot-com"
              target="_blank"
              className="w-full px-7 py-5 font-semibold rounded-full bg-[#111111] text-white hover:bg-black transition-all active:scale-[0.98] flex items-center justify-between shadow-lg cursor-pointer"
            >
              <span>Github Sponsors</span>
              <ArrowUpRight className="w-5 h-5 text-white/50" />
            </a>
            <a
              href="https://buymeacoffee.com/prodot_com"
              target="_blank"
              className="w-full px-7 py-5 font-semibold rounded-full bg-white/60 backdrop-blur-md text-[#111111] hover:bg-white/80 transition-all active:scale-[0.98] flex items-center justify-between shadow-sm cursor-pointer border border-white/40"
            >
              <span>Buy Me a Coffee</span>
              <ArrowUpRight className="w-5 h-5 text-[#1a1a1a]/50" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo className="h-7" showText />
          <div className="flex items-center gap-6 text-[13px] text-[#6b6b6b]">
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">
              Contact
            </a>
          </div>
          <p className="text-[13px] text-[#6b6b6b]">
            &copy; {new Date().getFullYear()} OneProfile. Build by Probal.
          </p>
        </div>
      </footer>
    </div>
  );
}
