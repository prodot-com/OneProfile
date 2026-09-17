"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { LuGithub } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa6";
import { Loader2, AlertCircle } from "lucide-react";
import Logo from "@/lib/logo";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"github" | "google" | null>(null);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailAuth = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (isSignUp && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error: signUpError } = await authClient.signUp.email({
          email,
          password,
          name: name.trim(),
        });
        if (signUpError) {
          setError(signUpError.message || "Sign up failed.");
          return;
        }
        router.push("/onboarding");
      } else {
        const { error: signInError } = await authClient.signIn.email({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message || "Invalid email or password.");
          return;
        }
        router.push("/dashboard");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "github" | "google") => {
    setSocialLoading(provider);
    setError("");
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
        newUserCallbackURL: "/onboarding",
        errorCallbackURL: "/login",
      });
      if (error) {
        setError(error.message || `${provider} sign in failed.`);
        setSocialLoading(null);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setSocialLoading(null);
    }
  };

  useEffect(()=>setError(""),[email, password, name])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full h-[650px] overflow-hidden p-0 rounded-[1rem] border-[#e5e2dc] shadow-xl bg-white/90 backdrop-blur-md">
        <CardContent className="h-full grid p-0 md:grid-cols-2">
          <form
            className="h-full p-6 md:p-10 flex flex-col justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleEmailAuth();
            }}
          >
            <FieldGroup>
              {/* Header */}
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center mb-2 bg-[#fafafa] rounded-2xl border border-[#e5e2dc] shadow-sm">
                  <Logo className="h-8 text-[#f97316]" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-[#1a1a1a]">
                  {isSignUp ? "Create your account" : "Welcome back"}
                </h1>
                <p className="text-balance text-[#6b6b6b] text-[15px]">
                  {isSignUp
                    ? "Sign up to start building your profile"
                    : "Login to your OneProfile account"}
                </p>
              </div>
 
              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Social Providers */}
              <Field className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  type="button"
                  className="rounded-xl border-[#e5e2dc] hover:bg-[#fafafa] h-11"
                  disabled={!!socialLoading || loading}
                  onClick={() => handleSocialSignIn("github")}
                >
                  {socialLoading === "github" ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <LuGithub className="w-4 h-4 mr-2" />
                  )}
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="rounded-xl border-[#e5e2dc] hover:bg-[#fafafa] h-11"
                  disabled={!!socialLoading || loading}
                  onClick={() => handleSocialSignIn("google")}
                >
                  {socialLoading === "google" ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <FaGoogle className="w-4 h-4 mr-2 text-[#ea4335]" />
                  )}
                  Google
                </Button>
              </Field>

              <FieldSeparator className="text-[#b4b0a4]">
                Or with email
              </FieldSeparator>

              {/* Name (sign-up only) */}
              {isSignUp && (
                <Field>
                  <FieldLabel htmlFor="name" className="text-[#1a1a1a]">
                    Name
                  </FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Probal Ghosh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                    className="rounded-xl border-[#e5e2dc] focus-visible:ring-[#f97316]"
                  />
                </Field>
              )}

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email" className="text-[#1a1a1a]">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="rounded-xl border-[#e5e2dc] focus-visible:ring-[#f97316]"
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-[#1a1a1a]">
                    Password
                  </FieldLabel>
                  {!isSignUp && (
                    <a
                      href="#"
                      className="ml-auto text-sm text-[#f97316] underline-offset-2 hover:underline hover:text-[#c2410c]"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  placeholder={isSignUp ? "Min 8 characters" : ""}
                  className="rounded-xl border-[#e5e2dc] focus-visible:ring-[#f97316]"
                />
              </Field>

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  disabled={loading || !!socialLoading}
                  className="rounded-xl bg-[#1a1a1a] hover:bg-[#333] text-white h-11"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isSignUp ? "Creating account…" : "Signing in…"}
                    </>
                  ) : isSignUp ? (
                    "Create Account"
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Field>

              {/* Toggle */}
              <FieldDescription className="text-center text-[#6b6b6b] mt-2">
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <span
                      onClick={() => {
                        setIsSignUp(false);
                        setError("");
                      }}
                      className="text-[#f97316] font-medium cursor-pointer hover:underline"
                    >
                      Sign in
                    </span>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{" "}
                    <span
                      onClick={() => {
                        setIsSignUp(true);
                        setError("");
                      }}
                      className="text-[#f97316] font-medium cursor-pointer hover:underline"
                    >
                      Sign up
                    </span>
                  </>
                )}
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden w-full h-full bg-[#fdfaf5] md:block overflow-hidden">
            <div className="absolute inset-0 bg-[url('/signIn.png')] bg-cover bg-center mix-blend-multiply" />
            {/* <div className="absolute inset-0 bg-gradient-to-tr from-[#f97316]/20 via-transparent to-transparent pointer-events-none" /> */}
            <div className="flex w-full h-full p-10 flex-col items-center justify-center relative z-10 bg-linear-to-r from-white to-transparent">
              {/* <h2 className="text-3xl font-serif font-bold text-[#c2410c] text-center !leading-tight">
                Your entire digital identity, in one beautiful page.
              </h2> */}
            </div>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-[#b4b0a4]">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline hover:text-[#1a1a1a]">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-[#1a1a1a]">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
