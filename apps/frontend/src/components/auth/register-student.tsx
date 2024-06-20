"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@headlessui/react";
import { Field, Input, Label } from "@headlessui/react";
import { Button } from "@/components/ui/button";

/**
 * If Student / Parent
 *    Preferred Name
 *    Town or Postcode
 *
 * If Tutor
 *    Title
 *    Gender
 *    Preferred Name
 *    Firstname
 *    Lastname
 *    Phone Number
 *    Address 1
 *    Address 2
 *    Town
 *    County
 *    Postcode
 *
 * @returns
 *
 */

export function RegisterStudent() {
  const [readSafeguarding, setReadSafeguarding] = useState(false);
  const [over18, setOver18] = useState(false);
  const [rightToWork, setRightToWork] = useState(false);
  const [onlyAccount, setSetOnlyAccount] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <div className="py-12 bg-white-900">
      <div className="shadow-lg max-w-[48rem] mx-auto">
        <Card className="rounded-lg">
          <CardHeader className="bg-blue-normal rounded-t-lg text-white-900">
            <CardTitle className="text-card-header-fg text-2xl text-center">
              Safeguarding Checks
            </CardTitle>
            <CardDescription className="text-base text-center text-brown-600">
              Here at TutorSeekers we take safeguarding very seriously. In order
              for safeguarding to work properly it is imperative everyone
              understands our procedures......
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-blue-light py-6">
            <form>
              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Checkbox
                    checked={readSafeguarding}
                    onChange={setReadSafeguarding}
                    className="group block size-4 rounded border bg-white-900 data-[checked]:bg-blue-normal"
                  >
                    <svg
                      className="stroke-white-900 opacity-0 group-data-[checked]:opacity-100"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Checkbox>
                  <Label className="font-semibold">
                    I have read and understood the safeguarding policy
                  </Label>
                </Field>
              </article>

              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Checkbox
                    checked={over18}
                    onChange={setOver18}
                    className="group block size-4 rounded border bg-white-900 data-[checked]:bg-blue-normal"
                  >
                    <svg
                      className="stroke-white-900 opacity-0 group-data-[checked]:opacity-100"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Checkbox>
                  <Label className="font-semibold">
                    I confirm I am 18 years old or over.
                  </Label>
                </Field>
              </article>

              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Checkbox
                    checked={rightToWork}
                    onChange={setRightToWork}
                    className="group block size-4 rounded border bg-white-900 data-[checked]:bg-blue-normal"
                  >
                    <svg
                      className="stroke-white-900 opacity-0 group-data-[checked]:opacity-100"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Checkbox>
                  <Label className="font-semibold">
                    I have the right to work in the UK.
                  </Label>
                </Field>
              </article>

              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Checkbox
                    checked={onlyAccount}
                    onChange={setSetOnlyAccount}
                    className="group block size-4 rounded border bg-white-900 data-[checked]:bg-blue-normal"
                  >
                    <svg
                      className="stroke-white-900 opacity-0 group-data-[checked]:opacity-100"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Checkbox>
                  <Label className="font-semibold">
                    I have no other accounts with TutorSeekers
                  </Label>
                </Field>
              </article>

              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Checkbox
                    checked={agreeTerms}
                    onChange={setAgreeTerms}
                    className="group block size-4 rounded border bg-white-900 data-[checked]:bg-blue-normal"
                  >
                    <svg
                      className="stroke-white-900 opacity-0 group-data-[checked]:opacity-100"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Checkbox>
                  <Label className="font-semibold">
                    I agree to TutorSeekers terms and condictions.
                  </Label>
                </Field>
              </article>
            </form>
          </CardContent>

          <CardFooter className="bg-blue-normal rounded-b-lg flex flex-row justify-end py-6">
            <Button variant="outline" className="text-white-900">
              Register
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
