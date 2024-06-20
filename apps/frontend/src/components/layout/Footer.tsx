import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";

// @mixin container () {

//   margin-left: auto;
//   margin-right:auto;
//   padding-left: 1.5rem;
//   padding-right: 1.5rem;
//   max-width: 1200px;
//   width: 80%;
//   width: 95%;

//   // border: 1px black solid;

//   @include breakpoint_max ('lg') {
//       width: 100%;
//   }

//   @include breakpoint_max ('md') {
//       padding-left: 1rem;
//       padding-right: 1rem;
//   }

// }

const Footer = () => {
  const loggedIn = false;
  const disabled = false;
  const year = new Date().getFullYear();

  //   <footer className="bg-card-header-bg text-card-header-fg pt-8" data-cy="footer">
  // className="bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% pt-8 text-white-800"
  // className="bg-blue-normal pt-8 text-white-800"

  return (
    <footer
      // className="bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% pt-8 text-white-800"
      className="bg-blue-normal pt-8 text-white-800"
      data-cy="footer"
    >
      {/* className={( disabled ? '' : ` ${styles.navbarEnabled}` )} */}
      <div className="m-auto max-w-7xl w-11/12">
        <div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 grid-rows-1">
          <div className="sm:col-span-2" data-cy="mission">
            <div className="inline-block hover:cursor-pointer">
              {disabled ? (
                <Image
                  src="/images/general/logo.png"
                  alt="Tutor seekers logo"
                  width={360}
                  height={67}
                  quality={75}
                />
              ) : (
                <Link href={loggedIn ? "/activity-center" : "/"}>
                  <Image
                    className="w-[300px]"
                    src="/images/general/logo.png"
                    alt="Tutor seekers logo"
                    width={360}
                    height={67}
                    quality={75}
                  />
                </Link>
              )}
            </div>
            <p className="py-4 text-lg">Empowering students to achieve more</p>

            <div className="sm:pl-10 m-auto pb-3 inline-block">
              <FaFacebookSquare className="h-10 w-10 inline-block hover:text-facebook cursor-pointer" />
              <FaSquareXTwitter className="h-10 w-10 mx-3 inline-block hover:text-white-600 cursor-pointer" />
              <FaEnvelope className="h-10 w-10 inline-block hover:text-gold cursor-pointer" />
            </div>
          </div>

          <div>
            <h6 className="pt-4 sm:pt-0 pb-2 text-xl">Company</h6>
            <ul className="list-none [&_li]:decoration-1 [&_li]:underline-offset-4 [&_li:hover]:underline text-sm">
              <li>
                <Link href={{ pathname: "/legal", query: { legal: "terms" } }}>
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/legal", query: { legal: "privacy" } }}
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/legal", query: { legal: "cookies" } }}
                >
                  Cookie
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/legal",
                    query: { legal: "safeguarding" },
                  }}
                >
                  Safeguarding
                </Link>
              </li>
              <li>
                <Link href="/">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="pt-4 sm:pt-0 pb-2 text-xl">Services</h6>
            <ul className="list-none [&_li]:decoration-1 [&_li]:underline-offset-4 [&_li:hover]:underline text-sm">
              <li>
                <Link href="/tutor-search">Tutor Search</Link>
              </li>
              <li>
                <Link href="/">Search Student Ads</Link>
              </li>
              <li>
                <Link href="/">Question &amp; Answers</Link>
              </li>
              <li>
                <Link href="/">Knowledge Centre</Link>
              </li>
              <li>
                <Link href="/">Courses</Link>
              </li>
              <li>
                <Link href="/">Study Buddies</Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="pt-4 sm:pt-0 pb-2 text-xl">Popular Subjects</h6>
            <ul className="list-none [&_li]:decoration-1 [&_li]:underline-offset-4 [&_li:hover]:underline text-sm">
              <li>
                <Link
                  className="text-my-white cursor-default"
                  href={{
                    pathname: "/tutor-search",
                    query: { subject: "Maths" },
                  }}
                >
                  Maths
                </Link>
              </li>
              <li>
                <Link
                  className="text-my-white cursor-default"
                  href={{
                    pathname: "/tutor-search",
                    query: { subject: "English" },
                  }}
                >
                  English
                </Link>
              </li>
              <li>
                <Link
                  className="text-my-white cursor-default"
                  href={{
                    pathname: "/tutor-search",
                    query: { subject: "Biology" },
                  }}
                >
                  Biology
                </Link>
              </li>
              <li>
                <Link
                  className="text-my-white cursor-default"
                  href={{
                    pathname: "/tutor-search",
                    query: { subject: "Chemistry" },
                  }}
                >
                  Chemistry
                </Link>
              </li>
              <li>
                <Link
                  className="text-my-white cursor-default"
                  href={{
                    pathname: "/tutor-search",
                    query: { subject: "Physics" },
                  }}
                >
                  Physics
                </Link>
              </li>
              <li>
                <Link
                  className="text-my-white cursor-default"
                  href={{
                    pathname: "/tutor-search",
                    query: { subject: "French" },
                  }}
                >
                  French
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 py-8 px-0 border-t-2 border-page-header-fg border-solid"
          data-cy="copyright"
        >
          <p className="text-center text-my-off-white">
            Copyright © 2015 - {year} Cameron and Guy Limited
          </p>
        </div>
      </div>
    </footer>
    // <footer className="border-t">
    //   <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
    //     <Link href='/'>
    //       <Image
    //         src="/images/general/logo.png"
    //         alt="logo"
    //         width={128}
    //         height={38}
    //       />
    //     </Link>

    //     <p>2023 Evently. All Rights reserved.</p>
    //   </div>
    // </footer>
  );
};

export default Footer;
