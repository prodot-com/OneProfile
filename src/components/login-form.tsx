"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { LuGithub } from "react-icons/lu"
import { FaGoogle } from "react-icons/fa6"
import Logo from "@/lib/logo"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/cn";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  
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

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 rounded-[1.5rem] border-[#e5e2dc] shadow-xl bg-white/90 backdrop-blur-md">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-10 flex flex-col justify-center" onSubmit={(e) => e.preventDefault()}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center mb-2 bg-[#fafafa] rounded-2xl border border-[#e5e2dc] shadow-sm">
                  <Logo className="h-8 text-[#f97316]" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-[#1a1a1a]">Welcome back</h1>
                <p className="text-balance text-[#6b6b6b] text-[15px]">
                  Login to your OneProfile account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email" className="text-[#1a1a1a]">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="rounded-xl border-[#e5e2dc] focus-visible:ring-[#f97316]"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-[#1a1a1a]">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm text-[#f97316] underline-offset-2 hover:underline hover:text-[#c2410c]"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required className="rounded-xl border-[#e5e2dc] focus-visible:ring-[#f97316]" />
              </Field>
              <Field>
                <Button type="button" className="rounded-xl bg-[#1a1a1a] hover:bg-[#333] text-white">Login</Button>
              </Field>
              <FieldSeparator className="text-[#b4b0a4]">
                Or continue with
              </FieldSeparator>
              <Field className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="rounded-xl border-[#e5e2dc] hover:bg-[#fafafa]" onClick={handleSignIn}>
                  <LuGithub className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" type="button" className="rounded-xl border-[#e5e2dc] hover:bg-[#fafafa]" onClick={() => alert("Google auth not configured yet")}>
                  <FaGoogle className="w-4 h-4 mr-2 text-rose-500" />
                  Google
                </Button>
              </Field>
              <FieldDescription className="text-center text-[#6b6b6b] mt-4">
                Don&apos;t have an account? <span onClick={handleSignIn} className="text-[#f97316] font-medium cursor-pointer hover:underline">Sign up with GitHub</span>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden w-full h-full bg-[#fdfaf5] md:block overflow-hidden">
            <div className="absolute inset-0 bg-[url('/back.png')] bg-cover bg-left opacity-30 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f97316]/20 via-transparent to-transparent pointer-events-none" />
            <div className="flex w-full h-full p-10 flex-col items-center justify-center relative z-10">
              <h2 className="text-3xl font-serif font-bold text-[#c2410c] text-center !leading-tight">
                Your entire digital identity, in one beautiful page.
              </h2>
            </div>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-[#b4b0a4]">
        By clicking continue, you agree to our <a href="#" className="underline hover:text-[#1a1a1a]">Terms of Service</a>{" "}
        and <a href="#" className="underline hover:text-[#1a1a1a]">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
