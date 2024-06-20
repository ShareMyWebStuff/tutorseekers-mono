"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { HeaderNav } from "./HeaderNav";
import HeaderMobileNav from "./HeaderMobileNav";
import { FaSignInAlt } from "react-icons/fa";
import { FaRegistered } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();
  console.log("Path +++++", path);

  // Check if the header needs to be absolute
  const absolutePaths = ["/auth/login", "/auth/register"];
  const absolute = false;
  absolutePaths.includes(path);

  // className={absolute ? "absolute bg-opacity-60" : ""}
  return (
    // <header className="bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% pt-8 text-white-800">
    <header className="bg-blue-normal pt-8 text-white-800">
      <div className="m-auto max-w-7xl w-11/12 ">
        <div className="flex items-center justify-between md:border-b-1 border-white-500 border-solid pb-4 md:pb-4">
          <Link href="/">
            <Image
              className="sm:w-[300px] w-[200px]"
              src="/images/general/logo.png"
              alt="Tutor seekers logo"
              width={360}
              height={67}
              quality={75}
            />
          </Link>

          <div className="flex items-center justify-between">
            <Button
              asChild
              className="text-lg mr-3 md:flex hidden"
              variant={"outline"}
              size="sm"
            >
              <Link href="/auth/login">
                <FaSignInAlt className="mr-1" />
                <span className="md:block hidden">Sign In</span>
              </Link>
            </Button>

            <Button
              asChild
              className="text-lg md:flex hidden"
              variant={"outline"}
              size="sm"
            >
              <Link href="/auth/register">
                <FaRegistered className="mr-1" />
                <span className="md:block hidden">Register</span>
              </Link>
            </Button>

            <Button
              asChild
              className="rounded-full shadow-xl text-lg mr-3 md:hidden flex"
              variant={"outline"}
              size="icon"
            >
              <Link href="/auth/login">
                <FaSignInAlt />
              </Link>
            </Button>

            <Button
              asChild
              className="rounded-full shadow-xl text-lg mr-3 md:hidden flex"
              variant={"outline"}
              size="icon"
            >
              <Link href="/auth/register">
                <FaRegistered />
              </Link>
            </Button>

            <HeaderMobileNav />
          </div>
        </div>

        <div className="md:block hidden py-2">
          <HeaderNav source={"a"} manualExpand={false} />
        </div>
      </div>
    </header>
  );
};

export default Header;

{
  /* <div className="wrapper flex items-center justify-between">
<Link href="/">
  <Image className="sm:w-[300px] w-[200px]" src='/images/general/logo.png' alt='Tutor seekers logo' width={360} height={67} quality={75}/>
</Link>

<nav className="md:flex-between md:block hidden w-full max-w-xs">
  <NavItems />
</nav>

<div className="flex w-32 justify-end gap-3">
   <UserButton afterSignOutUrl="/" />
    <MobileNav />
  <SignedOut>
    <Button asChild className="rounded-full" size="lg">
      <Link href="/sign-in">
        Login
      </Link>
    </Button>
  </SignedOut> 
</div>
</div> */
}
