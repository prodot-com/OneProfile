import { authClient } from "@/lib/auth-client";

  export const handleSignIn = async () => {
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