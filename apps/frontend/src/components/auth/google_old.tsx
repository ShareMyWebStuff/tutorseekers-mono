"use client";

import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { jwtDecode } from 'jwt-decode';
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

function getGoogleOAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL as string,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  console.log({ options });

  const qs = new URLSearchParams(options);

  console.log(qs.toString());
  return `${rootUrl}?${qs.toString()}`;
}

// function getGoogleOAuthURL() {
//   const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

//   const options = {
//     redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL as string,
//     client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
//     access_type: "offline",
//     response_type: "code",
//     prompt: "consent",
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ].join(" "),
//   };

//   const qs = new URLSearchParams(options);

//   return `${rootUrl}?${qs.toString()}`;
// }

interface GoogleProps {
  disabled?: boolean;
}

export const Google = ({ disabled }: GoogleProps) => {
  return (
    <div>
      <Link
        href={getGoogleOAuthURL()}
        className={
          buttonVariants({ variant: "outlinel" }) +
          " w-full" +
          (disabled ? " opacity-50" : "")
        }
      >
        <FcGoogle className="h-5 w-5" />
      </Link>
    </div>
  );
};
