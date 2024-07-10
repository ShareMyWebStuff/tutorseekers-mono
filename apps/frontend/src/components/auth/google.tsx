"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter, redirect } from "next/navigation";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { jwtDecode } from 'jwt-decode';
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Script from "next/script";

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

//   console.log({ options });

//   const qs = new URLSearchParams(options);

//   console.log(qs.toString());
//   return `${rootUrl}?${qs.toString()}`;
// }

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

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleProps {
  disabled?: boolean;
}

const useFetch = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response: any) => {
    setLoading(true);
    // Use axios
    // 1. Set loading
    // 2. Call backend to authenticate google account
    //    2.0 Success route
    //    2.1 Authenticate google account
    //    2.2 Check account isnt already in use
    //    2.3
    //
    //    3.0 Error
    //    3.1 Account already validated return error
    // 4. Add account to redux
    // 5. Goto next page

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);

        return res.json();
      })
      .then((data) => {
        console.log("Data +++++");
        console.log(data);
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          window.location.reload();
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { loading, error, handleGoogle };
};

export const Google = ({ disabled }: GoogleProps) => {
  const { handleGoogle, loading, error } = useFetch(
    // "http://localhost:5152/signup",
    "https://api-dev.cameronguy.biz/auth/signup",
  );

  useEffect(() => {
    console.log("1 - HERE");
    /* global google */
    if (typeof window !== undefined && window.google) {
      console.log("2 - HERE");
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });
      console.log("3 - HERE");

      window.google.accounts.id.renderButton(
        document.getElementById("signUpDiv"),
        {
          // type: "standard",
          // theme: "filled_black",
          theme: "outline",
          size: "large",
          width: "334",
          // size: "small",
          text: "signup_with",
          shape: "rectangular",
        },
      );

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <div>
      {/* <Script src="https://accounts.google.com/gsi/client" defer async /> */}
      {/* <Link
        href={auth()}
        className={
          buttonVariants({ variant: "outlinel" }) +
          " w-full" +
          (disabled ? " opacity-50" : "")
        }
      >
        <FcGoogle className="h-5 w-5" />
      </Link> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div id="signUpDiv" className="w-full" data-text="signup_with"></div>
      )}

      {/* <Button
        className={"w-full" + (disabled ? " opacity-50" : "")}
        type="button"
        variant={"outlinel"}
        onClick={() => auth()}
      >
        <FcGoogle className="h-5 w-5" />
      </Button> */}
    </div>
  );
};
