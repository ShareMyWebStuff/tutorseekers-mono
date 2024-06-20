import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

{
  /* <div className="bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% pt-8 text-white-800"> */
}

export function OurSubjects() {
  const router = useRouter();

  return (
    // <div className="bg-gradient-to-r from-blue-light from-0% via-white-900 via-50% to-blue-light to-90% pt-8 text-black pb-6">
    <div className="bg-blue-light pt-8 text-black pb-6">
      <div className="max-w-7xl w-11/12 m-auto">
        <h2 className="text-2xl text-center mb-12">Our Subjects</h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          data-cy="landingOurSubjectsSectionItems"
        >
          <div
            className="group pb-10"
            onClick={() => {
              router.push("/subjects/list?category=Academic");
            }}
          >
            <h5 className="text-center pb-2 group-hover:font-semibold group-hover:tracking-wider">
              Academic
            </h5>

            <Image
              src="/images/landing/academic.png"
              alt="Academic Subjects Image"
              width="267"
              height="291"
              className="mx-auto transition ease-in-out duration-300 group-hover:scale-105"
            />
          </div>

          <div
            className="group"
            onClick={() => {
              router.push("/subjects/list?category=IT");
            }}
            // onClick={() => {
            //   router.push({
            //     pathname: "/list-subjects",
            //     query: { category: "IT" },
            //   });
            // }}
          >
            <h5 className="text-center pb-2 group-hover:font-semibold group-hover:tracking-wider">
              IT
            </h5>

            <Image
              src="/images/landing/it.png"
              alt="IT Subjects Image"
              width="267"
              height="291"
              className="mx-auto transition ease-in-out duration-300 group-hover:scale-105"
            />
          </div>

          <div
            className="group"
            onClick={() => {
              router.push("/subjects/list?category=Lifestyle");
            }}

            // onClick={() => {
            //   router.push({
            //     pathname: "/list-subjects",
            //     query: { category: "Lifestyle" },
            //   });
            // }}
          >
            <h5 className="text-center pb-2 group-hover:font-semibold group-hover:tracking-wider">
              Lifestyle
            </h5>

            <Image
              src="/images/landing/lifestyle.png"
              alt="Lifestyle Subjects Image"
              width="267"
              height="291"
              className="mx-auto transition ease-in-out duration-300 group-hover:scale-105"
            />
          </div>

          <div
            className="group"
            onClick={() => {
              router.push("/subjects/list?category=Professional");
            }}
          >
            <h5 className="text-center pb-2 group-hover:font-semibold group-hover:tracking-wider">
              Professional
            </h5>

            <Image
              src="/images/landing/professional.png"
              alt="Professional subjects image"
              width="266"
              height="291"
              className="mx-auto transition ease-in-out duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="my-4 flex items-center justify-center">
          <Button asChild variant={"outliner"} size="sm">
            <Link href="/subjects/list">View all Subjects</Link>
          </Button>
        </div>

        {/* <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              router.push("/list-subjects");
            }}
          >
            View all Subjects
          </button>
        </div> */}
      </div>
    </div>
  );
}
