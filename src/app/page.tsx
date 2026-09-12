"use client";

// import { AvatarDemo } from "@/components/AvatarCustom";
import { authClient, signIn } from "@/lib/auth-client";
import Logo from "@/lib/logo";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Layout, Palette, Zap } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const links = ["Home", "About", "Explore", "Pricing", "Contact"];

  const handleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      newUserCallbackURL: "/onboarding",
      errorCallbackURL: "/",
    });

    if (error) {
      console.error(error);
      console.log(error);
    }
  };

  const features = [
    {
      icon: <Layout className="w-6 h-6 text-[#d0a745]" />, // Matching the gold/brown from the button
      title: "Custom Layouts",
      description:
        "Build your perfect link-in-bio with drag-and-drop ease and powerful grid systems.",
    },
    {
      icon: <Palette className="w-6 h-6 text-[#d0a745]" />,
      title: "Premium Themes",
      description:
        "Choose from dozens of designer-made themes or customize every detail to match your brand.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#d0a745]" />,
      title: "Deep Analytics",
      description:
        "Understand your audience with real-time insights, click tracking, and viewer demographics.",
    },
    {
      icon: <Zap className="w-6 h-6 text-[#d0a745]" />,
      title: "Lightning Fast",
      description:
        "Optimized for speed and SEO to ensure maximum conversion rates for your links.",
    },
  ];

  return (
    <div className="min-h-screen w-full relative bg-black z-0 font-sans">
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 overflow-hidden">
        {/* User's Original Background Overlays & Image */}
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-0 bg-gradient-to-t from-black to-transparent" />
        <Image
          src="/pic5.jpg"
          alt="background"
          fill
          className="object-cover p- -z-10 rounded-2x"
          priority
        />

        {/* User's Original Navbar */}
        <div className="fixed top-0 left-0 flex justify-center items-center w-full mt-10 z-50 px-4">
          <div
            className="w-full max-w-3xl h-[60px] flex items-center justify-between 
          font-mono px-6 bg-white/20 rounded-lg backdrop-blur-md border border-white/30 shadow-lg"
          >
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <Logo className="cursor-pointer font-normal text-black/85 hover:rotate-90 transition-all delay-75 duration-800 ease-in-out" />
              </div>

              <div className="hidden md:flex items-center gap-7">
                {links.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-black/70 hover:text-black transition duration-200 text-[15px] font-semibold"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={handleSignIn}
                className="relative z-10 px-5 py-2.5 cursor-pointer
                rounded-lg text-white font-serif text-[1.1rem] tracking-wide
                bg-gradient-to-b from-[#755917] via-[#4d3a0d] to-[#2a2005]
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_20px_35px_-10px_rgba(0,0,0,0.7)]
                hover:shadow-none transition-all delay-500 duration-150
              "
              >
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Added Hero Content overlaying the center */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-1 text-center lg:text-left text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight drop-shadow-2xl">
              One link to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5b955] to-[#c5912d]">
                rule them all
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto lg:mx-0 drop-shadow-md">
              Connect your audiences to all of your content with a single,
              beautiful link. Create, customize, and analyze – entirely for
              free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleSignIn}
                className="px-8 py-3.5 rounded-full text-base font-semibold bg-white text-black hover:bg-white/90 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2"
              >
                Claim your profile <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="flex-1 max-w-[340px] w-full hidden md:block perspective-[1000px]"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              // transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative bg-black/60 backdrop-blur-md rounded-[2.5rem] border-[4px] border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden aspect-[10/19]"
            >
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                <div className="w-24 h-5 bg-black rounded-b-xl"></div>
              </div>
              <div className="p-6 pt-12 h-full flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#755917] to-black p-[2px] mb-4">
                  <div className="w-full h-full rounded-full bg-neutral-900 overflow-hidden border-2 border-black/50" />
                </div>
                <div className="w-32 h-4 bg-white/20 rounded mb-2" />
                <div className="w-48 h-3 bg-white/10 rounded mb-8" />

                <div className="w-full space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-full h-12 bg-white/10 rounded-xl flex items-center px-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/20" />
                      <div className="ml-3 h-3 w-3/5 bg-white/20 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Building below the main section replacing the empty div */}
      <div className="w-full relative bg-b;ack text-white z-10">
        {/* Features Section */}
        <section className="py-24 px-6 relative overflow-hidden text-white border-t border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#755917]/10 via-black to-black"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Everything you need
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto text-lg">
                Powerful tools designed to help you monetize your audience,
                understand your traffic, and build your digital identity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#755917]/20 flex items-center justify-center mb-6 border border-[#755917]/30 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-6 bg-black text-white/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Logo className="w-6 h-6 text-white/50" />
              <span className="font-mono tracking-wide">OneProfile</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} OneProfile.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
