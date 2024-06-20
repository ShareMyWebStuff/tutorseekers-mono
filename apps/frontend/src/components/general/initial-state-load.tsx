"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCookieOptions } from "@/lib/features/cookies/cookiesSlice";

const InitialStateLoad = () => {
  const dispatch = useAppDispatch();

  /**
   * Retrieve the cookie status from local storage and set redux status to display the cookie banner.
   */
  useEffect(() => {
    console.log("LAYOUT - CHECK COOKIES");
    const cookies = localStorage.getItem("cb");
    if (cookies) {
      dispatch(setCookieOptions(JSON.parse(cookies)));
    } else {
      dispatch(
        setCookieOptions({
          display: true,
          status: "N",
          analytics: false,
          thirdParty: false,
        }),
      );
    }
  }, []);

  return <main></main>;
};

export default InitialStateLoad;
