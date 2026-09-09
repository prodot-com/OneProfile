// import { authClient } from "@/lib/auth-client"; //import the auth client

"use client";

import { authClient } from "@/lib/auth-client";

export default function SignInButton() {
  const handleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      newUserCallbackURL: "/onboarding",
      errorCallbackURL: "/login?error=true",
    });

    if (error) {
      console.error(error);
      console.log(error);
    }
  };

  return <button onClick={handleSignIn}>Sign in with GitHub</button>;
}
