import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="bg-blue-light pt-8 text-black pb-6">
      <div className="max-w-7xl w-11/12 m-auto">
        <div className="mx-auto my-12 w-4/5 sm:w-[600px] bg-white-900 rounded-xl">
          <header className="flex flex-row">
            <h2 className="text-2xl mx-auto my-6">
              <Image
                src="/images/error-icon.png"
                alt="404 error image"
                width="30"
                height="30"
                className="w-[30px] h-[30px] inline-block mr-4"
              />
              Page not found
            </h2>
          </header>

          <div className="px-4 pb-4">
            <p className="mb-6 md:my-4">
              The page you are looking for may have been removed, had its name
              changed or is temporarily unavailable.
            </p>
            <p className="my-6 md:my-4">
              Please click the button to return to the home page.
            </p>
            <div className="flex items-center justify-center">
              <Button asChild variant={"outliner"} size="sm">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
