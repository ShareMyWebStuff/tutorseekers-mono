"use client";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";

export function OurService() {
  const [firstItem, setFirstItem] = useState(0);
  const [secondItem, setSecondItem] = useState(1);
  const [thirdItem, setThirdItem] = useState(2);

  const sliderData = [
    {
      img: "/images/landing/course-icon.png",
      alt: "Courses image",
      header: "Courses",
      para: "Looking for courses online or in your local area? Search our listings to see if we have what your looking for. Tutors and companies are encouraged to advertise free of charge, so whether it’s learning to throw pottery or a crash course in algebra over a school holiday, we have it covered.",
      btnText: "View Courses",
    },
    {
      img: "/images/landing/knowledge-icon.png",
      alt: "Knowledge center image",
      header: "Knowledge Center",
      para: "We welcome articles from tutors and students alike. Want to get something published or looking for help on a specific subject? Click on the link to have a look at the articles in a knowledge center. Each article is rated and feedback provided by other users and tutors.",
      btnText: "View Knowledge Center",
    },
    {
      img: "/images/landing/study-buddies.jpg",
      alt: "Study buddy image",
      header: "Study Buddies",
      para: "Learning can be less daunting when you learn together. We can put you in touch with other people learning the same subject at the same level as you. Read our security tips to ensure you use this facility in a safe way.",
      btnText: "View Study Buddies",
    },
    {
      img: "/images/landing/question-and-answer.jpg",
      alt: "Questions and answers image",
      header: "Questions and Answers",
      para: "Need an answer to a challenging question? You can post specific answers online and other tutors and students will tell you what they think! Need an answer from a subject matter expert quickly? You can pay to post questions to specific tutors taking part.",
      btnText: "View Q & A",
    },
  ];

  // Handler for previous slide
  const handlePrevBtn = () => {
    setFirstItem(firstItem === 0 ? sliderData.length - 1 : firstItem - 1);
    setSecondItem(secondItem === 0 ? sliderData.length - 1 : secondItem - 1);
    setThirdItem(thirdItem === 0 ? sliderData.length - 1 : thirdItem - 1);
  };

  // Handler for the next slide
  const handleNextBtn = () => {
    setFirstItem(sliderData.length - 1 === firstItem ? 0 : firstItem + 1);
    setSecondItem(sliderData.length - 1 === secondItem ? 0 : secondItem + 1);
    setThirdItem(sliderData.length - 1 === thirdItem ? 0 : thirdItem + 1);
  };

  return (
    <div className="bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% text-white-800">
      <div className="max-w-7xl w-11/12 m-auto pb-12">
        {/* <h2 className="text-2xl text-center mb-12">Our Subjects</h2> */}

        {/* className={styles.landingOther} */}
        <main className="" data-cy="landingOtherServicesSection">
          <header className="p-12">
            <h2 className="text-2xl text-center mb-12">Other Services</h2>

            <p className="mb-6">
              We care passionately about making learning easy and ensuring you
              have access to all your educational needs in one place.
            </p>
            <p className="mb-2">
              Looking for reading material on a specific subject? Maybe you’ve
              got a challenging subject you can’t quickly crack or you’re
              thinking of taking a course just for fun.{" "}
            </p>
          </header>

          <section className="flex">
            <button
              title="Previous Service"
              onClick={handlePrevBtn}
              className="mr-2"
              data-cy="prevBtn"
            >
              <SquareChevronLeft className="w-8 h-8" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 lg:gap-x-12">
              <Card>
                <CardHeader>
                  <Image
                    src={sliderData[firstItem].img}
                    alt={sliderData[firstItem].alt}
                    width={536}
                    height={295.13}
                    quality={75}
                    className="rounded-lg"
                  />
                </CardHeader>
                <CardContent>
                  <h4 className="my-4 text-center text-xl font-semibold">
                    {sliderData[firstItem].header}
                  </h4>
                  <p>{sliderData[firstItem].para}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="mx-auto">
                    {sliderData[firstItem].btnText}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hidden md:block">
                <CardHeader>
                  <Image
                    src={sliderData[secondItem].img}
                    alt={sliderData[secondItem].alt}
                    width={536}
                    height={295.13}
                    quality={75}
                    className="rounded-lg"
                  />
                </CardHeader>
                <CardContent>
                  <h4 className="my-4 text-center text-xl font-semibold">
                    {sliderData[secondItem].header}
                  </h4>
                  <p>{sliderData[secondItem].para}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="mx-auto">
                    {sliderData[secondItem].btnText}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hidden xl:block">
                <CardHeader>
                  <Image
                    src={sliderData[thirdItem].img}
                    alt={sliderData[thirdItem].alt}
                    width={536}
                    height={295.13}
                    quality={75}
                    className="rounded-lg"
                  />
                </CardHeader>
                <CardContent>
                  <h4 className="my-4 text-center text-xl font-semibold">
                    {sliderData[thirdItem].header}
                  </h4>
                  <p>{sliderData[thirdItem].para}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="mx-auto">
                    {sliderData[thirdItem].btnText}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <button
              title="Next Service"
              onClick={handleNextBtn}
              className="ml-2"
              data-cy="nextBtn"
            >
              <SquareChevronRight className="w-8 h-8" />
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
