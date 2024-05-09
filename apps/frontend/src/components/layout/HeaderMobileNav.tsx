import Image from "next/image"
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Separator } from "../ui/separator"
import { HeaderNav } from "./HeaderNav"
  
  
  const HeaderMobileNav = () => {
    return (
      <nav className="md:hidden ">
        <Sheet>
          <SheetTrigger className="align-middle">
            <Image 
              src="/assets/icons/menu.svg"
              alt="menu"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-6 bg-page-header-bg text-white-off lg:hidden">
          <Link href="/" >
            <Image className="sm:w-[300px] w-[200px]" src='/images/general/logo.png' alt='Tutor seekers logo' width={360} height={67} quality={75}/>
          </Link>
            <Separator className="border border-gray-50" />
            <HeaderNav source={'m'} manualExpand={true} />
          </SheetContent>
        </Sheet>
      </nav>
    )
  }
  
  export default HeaderMobileNav