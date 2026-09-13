"use client";

import { PhoneMockupCard } from "@/components/ui/phoneMockup";
import { authClient } from "@/lib/auth-client";
import Logo from "@/lib/logo";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  GripVertical,
  Layers,
  Palette,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export default function Home() {
  const handleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      newUserCallbackURL: "/onboarding",
      errorCallbackURL: "/",
    });
    if (error) {
      console.error(error);
    }
  };

  const navLinks = ["Features", "How it works", "Pricing"];

  const features = [
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Premium Themes",
      description:
        "Choose from beautifully crafted themes or customize every detail to match your brand perfectly.",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Deep Analytics",
      description:
        "Understand your audience with real-time insights, click tracking, and viewer demographics.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Lightning Fast",
      description:
        "Optimized for speed and SEO to ensure maximum conversion rates for every link.",
    },
    {
      icon: <GripVertical className="w-5 h-5" />,
      title: "Drag & Drop",
      description:
        "Reorder your links effortlessly with an intuitive drag-and-drop interface.",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Custom Layouts",
      description:
        "Build your perfect link-in-bio with flexible grid systems and layout options.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Social Integration",
      description:
        "Connect all your social profiles in one place with beautiful, recognizable icons.",
    },
  ];

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
    <div className="min-h-screen relative text-[#1a1a1a] selection:bg-[#755917]/20 selection:text-[#1a1a1a]">
      {/* ─── Background Image (hero section only) ─── */}
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden -z-10 pointer-events-none">
        <Image src="/back.png" alt="" fill className="object-cover" priority />
        <div className="absolute bottom-0 h-25 w-full bg-linear-to-t from-white to-transparent" />
      </div>

      <div className="fixed top-0 left-0 flex justify-center items-center w-full mt-10 z-20 px-4">
        <div
          className="w-full max-w-3xl h-[60px] flex items-center justify-between 
          font-mono px-6 bg-white/20 rounded-lg backdrop-blur-md border border-white/30 shadow-lg"
        >
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 flex items-center justify-center">
              <Logo className="h-9 cursor-pointer"/>
            </div>

            <div className="flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[14px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <button
            onClick={handleSignIn}
              className="
                relative z-10 px-5 py-2.5 cursor-pointer
                rounded-lg text-white font-serif text-[1.1rem] tracking-wide
                bg-linear-to-b from-[#755917] via-[#4d3a0d] to-[#2a2005]
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_20px_35px_-10px_rgba(0,0,0,0.7)]
                hover:shadow-none transition-all delay-500 duration-150
              "
            >
              Book a demo
            </button>
          </div>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="pt-36 pb-20 lg:pt-44 lg:pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e5e2dc] text-[13px] text-[#6b6b6b] mb-8 bg-white">
              <Sparkles className="w-3.5 h-3.5 text-[#755917]" />
              Free + Open for everyone
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.1] tracking-tight mb-6"
          >
            Build your digital identity.{" "}
            <span className="italic text-[#755917]">Free.</span>
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
              className="px-6 py-3 rounded-lg text-[15px] font-medium border border-[#e5e2dc] text-[#6b6b6b] hover:border-[#ccc] hover:text-[#1a1a1a] transition-all"
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
                <p className="text-[13px] text-[#6b6b6b] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Showcase ─── */}
      <section className="py-20 px-6 bg-white">
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
                <span className="italic text-[#755917]">
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
                className="inline-flex items-center gap-2 text-[15px] font-medium text-[#755917] hover:text-[#5a4412] transition-colors group cursor-pointer"
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
                <PhoneMockupCard
                  variant="orange"
                  className="mx-auto shadow-2xl shadow-zinc-900/20"
                >
                  <div className="px-5 pb-6 pt-17 flex flex-col items-center">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#755917] to-[#2a2005] p-[2px] mb-3">
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <img
                          src="/avatar.jpeg"
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div className="font-serif text-[15px] font-bold text-[#1a1a1a] mb-0.5">
                      Probal Ghosh
                    </div>
                    <div className="text-[11px] text-[#6b6b6b] mb-5">
                      Fullstack Engineer
                    </div>

                    <div className="w-full space-y-2.5">
                      {["Portfolio", "YouTube", "Blog", "Twitter"].map(
                        (label, i) => (
                          <div
                            key={i}
                            className="w-full h-10 rounded-xl border border-[#e5e2dc] bg-white flex items-center justify-center text-[12px] font-medium text-[#1a1a1a]"
                          >
                            {label}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </PhoneMockupCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-24 px-6 border-t border-[#e5e2dc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4">
              Everything you need to grow
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
              Powerful tools designed to help you build your digital identity,
              understand your traffic, and engage your audience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx}
                className="bg-white border border-[#e5e2dc] rounded-2xl p-7 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#f5ecd8] flex items-center justify-center mb-5 text-[#755917] group-hover:scale-105 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-[17px] font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#6b6b6b] text-[14px] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
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

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 border-t border-[#e5e2dc]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
            Ready to build your{" "}
            <span className="italic text-[#755917]">digital presence?</span>
          </h2>
          <p className="text-[#6b6b6b] text-lg mb-10 max-w-xl mx-auto">
            Join thousands of creators who are already using OneProfile to
            connect with their audience. Free, no credit card required.
          </p>
          <button
            onClick={handleSignIn}
            className="px-8 py-3.5 rounded-lg text-[15px] font-medium bg-[#1a1a1a] text-white hover:bg-[#333] transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
          >
            Get Started Now <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[#e5e2dc] py-10 px-6">
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
            &copy; {new Date().getFullYear()} OneProfile. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
