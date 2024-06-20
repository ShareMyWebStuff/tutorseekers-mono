"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import type { ReactNode } from "react";
import { selectDisplay } from "@/lib/features/cookies/cookiesSlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";

import {
  setCookieOptions,
  ICookiesState,
} from "@/lib/features/cookies/cookiesSlice";

interface Props {
  readonly children: ReactNode;
}

const CookieController = ({ children }: Props) => {
  const [showCookieMsg, setShowCookieMsg] = useState<boolean>(true);
  const [analytics, setAnalytics] = useState(true);
  const [thirdParty, setThirdParty] = useState(true);

  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const cookieDisplay = useAppSelector(selectDisplay);

  // Save the cookie data
  const saveCookieOptions = (opts: ICookiesState) => {
    localStorage.setItem("cb", JSON.stringify(opts));
    dispatch(setCookieOptions(opts));
  };

  // Create the cookie button in the bottom left hand corner
  const CookieButton: React.FC = () => {
    return (
      <button
        title="Cookie Banner Toggle"
        className="fixed bottom-0 w-20 h-20 cursor-pointer z-2000 bg-transparent overflow-visible"
        onClick={() => {
          setShowCookieMsg((prev: boolean) => {
            return !prev;
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="72.5"
          width="72.5"
          viewBox="0 0 72.5 72.5"
          aria-hidden="true"
          enableBackground="new 0 0 72.5 72.5"
        >
          <title>Cookie Control Icon</title>
          <g className="fill-blue-normal">
            <path d="M0,0l72.5,72.5H0V0z"></path>
          </g>
          <g className="fill-white-900">
            <path d="M33.2,51.9l-3.9-2.6l1.6-4.4l-4.7,0.2L25,40.6l-3.7,2.9l-3.7-2.9l-1.2,4.5l-4.7-0.2l1.6,4.4l-3.9,2.6l3.9,2.6l-1.6,4.4l4.7-0.2l1.2,4.5l3.7-2.9l3.7,2.9l1.2-4.5l4.7,0.2l-1.6-4.4L33.2,51.9z M24.6,55.3c-0.3,0.4-0.8,0.8-1.3,1s-1.1,0.3-1.9,0.3c-0.9,0-1.7-0.1-2.3-0.4s-1.1-0.7-1.5-1.4c-0.4-0.7-0.6-1.6-0.6-2.6c0-1.4,0.4-2.5,1.1-3.3c0.8-0.8,1.8-1.1,3.2-1.1c1.1,0,1.9,0.2,2.6,0.7s1.1,1.1,1.4,2L23,50.9c-0.1-0.3-0.2-0.5-0.3-0.6c-0.1-0.2-0.3-0.4-0.5-0.5s-0.5-0.2-0.7-0.2c-0.6,0-1.1,0.2-1.4,0.7c-0.2,0.4-0.4,0.9-0.4,1.7c0,1,0.1,1.6,0.4,2c0.3,0.4,0.7,0.5,1.2,0.5c0.5,0,0.9-0.1,1.2-0.4s0.4-0.7,0.6-1.2l2.3,0.7C25.2,54.3,25,54.8,24.6,55.3z"></path>
          </g>
        </svg>
      </button>
    );
  };

  const cookieClass = `fixed top-0 h-full w-[450px] bg-blue-dark text-white-900 p-5 rounded-r-lg bg-opacity-100 ${showCookieMsg ? "left-0" : " -left-[450px]"}`;
  const cookieBackDrop = `${pathname === "/legal" && !showCookieMsg ? "" : "fixed z-1000 bg-opacity-60 top-0 left-0 size-full bg-black"}`;

  if (pathname !== "/legal" && !showCookieMsg) {
    setShowCookieMsg(true);
  }

  return (
    <>
      {children}
      {cookieDisplay && (
        <div className={cookieBackDrop}>
          <div
            className={cookieClass} // "fixed left-0 top-0 h-full w-[450px] bg-blue-dark text-white-900 p-5 rounded-r-lg bg-opacity-100"
            data-cy="cookieBanner"
          >
            <h1 className="text-2xl text-center">Our use of cookies</h1>

            <div className="overflow-x-hidden overflow-y-scroll scrollbar h-full">
              <p className="mx-3 my-6 text-sm">
                We use cookies, which are small files saved on your device.
                These cookies store information about how you use our website.
                Some of these cookies are necessary to make our site work.{" "}
              </p>
              <p className="mx-3 my-6 text-sm">
                We&apos;d also like to set analytics cookies and third party
                cookies, these are explained below.
              </p>

              <p className="mx-3 my-6 text-sm">
                If you would like more information about the cookies that we
                use, please{" "}
                <Link
                  className="underline font-semibold"
                  href={{ pathname: "/legal", query: { legal: "cookies" } }}
                >
                  visit our cookie policy page.
                </Link>
              </p>

              <p className="mx-3 my-6 text-sm">
                Pressing hide will hide this banner. Pressing the cookie icon in
                the bottom left hand corner will redisplay this banner.
              </p>

              <div className="flex my-6">
                <Button
                  className="mt-6 mx-auto"
                  variant="outline"
                  type="submit"
                  onClick={(e) =>
                    saveCookieOptions({
                      display: false,
                      status: "A",
                      analytics,
                      thirdParty,
                    })
                  }
                >
                  Accept Cookies
                </Button>

                {pathname === "/legal" && (
                  <Button
                    className="mt-6 mx-auto"
                    variant="outline"
                    type="submit"
                    onClick={() => {
                      setShowCookieMsg((prev: boolean) => {
                        return !prev;
                      });
                    }}
                  >
                    Hide
                  </Button>
                )}
              </div>

              <hr />

              <article className="my-4 p-2 mr-2 bg-blue-normal rounded-lg">
                <h3 className="text-xl py-4">
                  <span>Necessary cookies</span>
                </h3>
                <p className="text-sm">
                  Necessary cookies enable core functionality such as security
                  and accessibility. You may disable these by changing your
                  browser settings, but this will affect how the website
                  functions.
                </p>
              </article>

              <article className="my-4 p-2 mr-2 bg-blue-normal rounded-lg">
                <h3 className="text-xl py-4 flex justify-between">
                  <span>Analytics Cookies</span>
                  <Switch
                    checked={analytics}
                    onChange={() => {
                      setAnalytics((prev) => !prev);
                    }}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-error transition data-[checked]:bg-success"
                  >
                    <span className="size-4 translate-x-1 rounded-full bg-white-900 transition group-data-[checked]:translate-x-6" />
                  </Switch>
                </h3>
                <p className="text-sm">
                  We&apos;d like to set Google Analytics cookies to help us
                  improve our website by collecting and reporting information on
                  how you use it. The cookies collect information in a way that
                  does not directly identify anyone.
                </p>
              </article>

              <article className="my-4 p-2 mr-2 mb-20 bg-blue-normal rounded-lg">
                <h3 className="text-xl py-4 flex justify-between">
                  <span>Third Party Cookies</span>
                  <Switch
                    checked={thirdParty}
                    onChange={() => {
                      setThirdParty((prev) => !prev);
                    }}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-error transition data-[checked]:bg-success"
                  >
                    <span className="size-4 translate-x-1 rounded-full bg-white-900 transition group-data-[checked]:translate-x-6" />
                  </Switch>
                </h3>
                <p className="text-sm">
                  Third party cookies may be required. The list of third party
                  cookies is shown on our Cookie page.
                </p>
              </article>
            </div>
          </div>
        </div>
      )}

      {cookieDisplay && <CookieButton />}
    </>
  );
};

export default CookieController;
