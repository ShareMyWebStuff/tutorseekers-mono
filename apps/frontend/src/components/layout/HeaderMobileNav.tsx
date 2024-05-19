import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { HeaderNav } from "./HeaderNav";
import { Menu } from "lucide-react";

const HeaderMobileNav = () => {
  return (
    <nav className="md:hidden ">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Menu className="cursor-pointer hover:font-bold" />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 lg:hidden bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% text-white-800">
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
          <Separator className="border border-gray-50" />
          <HeaderNav source={"m"} manualExpand={true} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default HeaderMobileNav;
