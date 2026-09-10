"use client";

// import { AvatarDemo } from "@/components/AvatarCustom";
import { authClient, signIn } from "@/lib/auth-client";
import Logo from "@/lib/logo";
import { Cannabis } from "lucide-react";
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

  return (
    <div className="min-h-screen w-full relative bg-black z-0">
      <main className="relative min-h-screen w-full ">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-60 border z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-60 border z-10" />
        <Image
          src="/pic4.jpg"
          alt="background"
          fill
          className="object-cover p- -z-10 rounded-2x"
          priority
        />

        <div className="fixed top-0 left-0 flex justify-center items-center w-full mt-10 z-20 px-4">
          <div
            className="w-full max-w-3xl h-[60px] flex items-center justify-between 
          font-mono px-6 bg-white/20 rounded-lg backdrop-blur-md border border-white/30 shadow-lg"
          >
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <Logo className="cursor-pointer font-normal text-black/85 hover:rotate-90 transition-all delay-75 duration-800 ease-in-out" />
              </div>

              <div className="flex items-center gap-7">
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
                bg-linear-to-b from-[#755917] via-[#4d3a0d] to-[#2a2005]
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_20px_35px_-10px_rgba(0,0,0,0.7)]
                hover:shadow-none transition-all delay-500 duration-150
              "
              >
                Go
              </button>
            </div>
          </div>
        </div>

        {/* <div className="absolute top-[24%] left-1/2 -translate-x-1/2 -translate-y-1/2 
          flex items-center gap-2 bg-[#755917]/35 px-3 py-1.5 rounded-lg backdrop-blur-lg">

            <AvatarDemo />
            <p className="text-[15px] text-white font-mono">
              Trusted by 1000+ users worldwide
            </p>

        </div> */}
      </main>
      <div className="w-full min-h-250 bg-black/40"></div>
    </div>
  );
}
