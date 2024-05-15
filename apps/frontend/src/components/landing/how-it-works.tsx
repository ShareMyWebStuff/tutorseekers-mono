import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function HowItWorks() {
  return (
    <div className="bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% text-white-800 pt-8">
      <div className="max-w-7xl w-11/12 m-auto pb-12">
        <main className="" data-cy="landingOtherServicesSection">
          <header>
            <h2 className="text-2xl text-center mb-12">How It Works</h2>
          </header>

          <section>
            <div className="mx-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Image
                    src="/images/landing/select-tutor.png"
                    alt="Select tutor icon"
                    width={64}
                    height={64}
                    quality={75}
                    className="h-16 w-16"
                  />
                  <CardTitle>Select a Tutor</CardTitle>
                </CardHeader>
                <CardContent className="h-56">
                  <ul>
                    <li className="my-2">
                      &#9758; Search our tutors by subjects and level
                    </li>
                    <li className="my-2">
                      &#9758; See tutors availibility verses your&#39;s
                    </li>
                    <li className="my-2">&#9758; Check tutors reviews</li>
                    <li className="my-2">
                      &#9758; Any questions - message the tutor directly
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Image
                    src="/images/landing/reserve.png"
                    alt="Select tutor icon"
                    width={100}
                    height={100}
                    quality={75}
                    className="h-16 w-16"
                  />
                  <CardTitle>Book Your Lesson</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    <li className="my-2">
                      &#9758; Found a tutor with availability
                    </li>
                    <li className="my-2">
                      &#9758; Book lessons online at set frequencies whether its
                      a one off or every week
                    </li>
                    <li className="my-2">
                      &#9758; Arrange payment terms with tutor
                    </li>
                    <li className="my-2">&#9758; Start learning</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Image
                    src="/images/landing/feedback.png"
                    alt="Tutor feedback icon"
                    width={80}
                    height={80}
                    quality={75}
                    className="h-16 w-16"
                  />
                  <h3 className="text-2xl font-semibold">Lesson Feedback</h3>
                </CardHeader>
                <CardContent>
                  <ul>
                    <li className="my-2">
                      &#9758; View what was covered in the lesson
                    </li>
                    <li className="my-2">
                      &#9758; See resources applicable to the lesson
                    </li>
                    <li className="my-2">&#9758; See homework set</li>
                    <li className="my-2">&#9758; See homework markings</li>
                    <li className="my-2">
                      &#9758; View tutor&#39;s feedback on your childs progress
                      and attitude
                    </li>
                    <li className="my-2">&#9758; Plus much more</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
