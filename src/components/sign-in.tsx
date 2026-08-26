// import { authClient } from "@/lib/auth-client"; //import the auth client

"use client";

import { authClient } from "@/lib/auth-client";

// await authClient.signIn.social({
//     /**
//      * The social provider ID
//      * @example "github", "google", "apple"
//      */
//     provider: "github",
//     /**
//      * A URL to redirect after the user authenticates with the provider
//      * @default "/new"
//      */
//     callbackURL: "/dashboard", 
//     /**
//      * A URL to redirect if an error occurs during the sign in process
//      */
//     errorCallbackURL: "/error",
//     /**
//      * A URL to redirect if the user is newly registered
//      */
//     newUserCallbackURL: "/welcome",
//     /**
//      * disable the automatic redirect to the provider. 
//      * @default false
//      */
//     disableRedirect: true,
// });

export default function SignInButton() {
  const handleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/new",
      errorCallbackURL: "/error",
      newUserCallbackURL: "/new",
    });

    if (error) {
      console.error(error);
      console.log(error)
    }
  };

  return (
    <button onClick={handleSignIn}>
      Sign in with GitHub
    </button>
  );
}