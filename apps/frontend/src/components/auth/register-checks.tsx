"use client";

import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@headlessui/react";
import { Field, Label } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { setChecks, selectAll } from "@/lib/features/register/registerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerTutorSchema = z.object({
  emailVerify: z.boolean().refine((val) => val === true, {
    message:
      "You need to have access to the email address you are registering with.",
  }),
  readSafeguarding: z.boolean().refine((val) => val === true, {
    message: "Please read our safeguarding policy.",
  }),
  over18: z.boolean().refine((val) => val === true, {
    message: "You need to be 18 or over to use this site.",
  }),
  rightToWork: z.boolean().refine((val) => val === true, {
    message: "You need to have the right to work in the UK.",
  }),
  onlyAccount: z.boolean().refine((val) => val === true, {
    message: "Please delete your other accounts before creating a new one.",
  }),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, { message: "Please read our terms." }),
});

type FormFields = z.infer<typeof registerTutorSchema>;

export function RegisterChecks() {
  const regBuffer = useAppSelector(selectAll);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    watch,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(registerTutorSchema),
    defaultValues: {
      emailVerify: regBuffer.emailVerify,
      readSafeguarding: regBuffer.readSafeguarding,
      over18: regBuffer.over18,
      rightToWork: regBuffer.rightToWork,
      onlyAccount: regBuffer.onlyAccount,
      agreeTerms: regBuffer.agreeTerms,
    },
  });

  console.log("Watch +++++");
  console.log(watch());

  console.log("Errors +++++");
  console.log(errors);

  const onBack = () => {
    router.push("/auth/register-" + regBuffer.accountType.toLowerCase());
  };

  // const onSubmit: SubmitHandler<FormFields> = (data) => console.log(data);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("HERE - onsubmit**");
    console.log(data);
    console.log("errors");
    console.log(errors);
    // return;
    try {
      // Can check if the email address has been used
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // setError("email", {
      //   message: "This email is already taken.",
      // });
      // dispatch(
      //   setChecks({
      //     emailVerify: data.emailVerify,
      //     readSafeguarding: data.readSafeguarding,
      //     over18: data.over18,
      //     rightToWork: data.rightToWork,
      //     onlyAccount: data.onlyAccount,
      //     agreeTerms: data.agreeTerms,
      //   }),
      // );
      router.push("/auth/register-checks");
    } catch (error) {
      setError("root", {
        message: "This email is already taken.",
      });
    }
  };

  return (
    <div className="py-12 bg-white-900">
      <div className="shadow-lg max-w-[48rem] mx-auto">
        <Card className="rounded-lg">
          <CardHeader className="bg-blue-normal rounded-t-lg text-white-900">
            <CardTitle className="text-card-header-fg text-2xl text-center">
              Account Checks
            </CardTitle>
            <CardDescription className="text-base text-center text-brown-600">
              Here at TutorSeekers we take safeguarding very seriously. In order
              for safeguarding to work properly it is imperative everyone
              understands our procedures......
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-blue-light py-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Controller
                    name="emailVerify"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
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
                    )}
                  />

                  <Label className="font-semibold">
                    You have access to the email address linked to your google
                    account
                  </Label>
                </Field>
              </article>

              {errors.emailVerify && (
                <div className="text-white-900 bg-blue-dark text-sm p-2 rounded-sm">
                  Please confirm you have access to the email account associated
                  with your google account
                </div>
              )}

              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Controller
                    name="readSafeguarding"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
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
                    )}
                  />

                  <Label className="font-semibold">
                    I have read and understood the safeguarding policy
                  </Label>
                </Field>
              </article>

              {errors.readSafeguarding && (
                <div className="text-white-900 bg-blue-dark text-sm p-2 rounded-sm">
                  Please conform you understand our safety policy
                </div>
              )}

              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Controller
                    name="over18"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
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
                    )}
                  />

                  <Label className="font-semibold">
                    I confirm I am 18 years old or over.
                  </Label>
                </Field>
              </article>

              {errors.over18 && (
                <div className="text-white-900 bg-blue-dark text-sm p-2 rounded-sm">
                  Please confirm you are 18 or over
                </div>
              )}

              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Controller
                    name="rightToWork"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
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
                    )}
                  />

                  <Label className="font-semibold">
                    I have the right to work in the UK.
                  </Label>
                </Field>
              </article>

              {errors.rightToWork && (
                <div className="text-white-900 bg-blue-dark text-sm p-2 rounded-sm">
                  Please confirm you have a right to work in the UK
                </div>
              )}

              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Controller
                    name="onlyAccount"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
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
                    )}
                  />

                  <Label className="font-semibold">
                    I have no other accounts with TutorSeekers
                  </Label>
                </Field>
              </article>

              {errors.onlyAccount && (
                <div className="text-white-900 bg-blue-dark text-sm p-2 rounded-sm">
                  To continue, you have no other accounts with us
                </div>
              )}

              <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Controller
                    name="agreeTerms"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
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
                    )}
                  />

                  <Label className="font-semibold">
                    I agree to TutorSeekers terms and conditions.
                  </Label>
                </Field>
              </article>

              {errors.agreeTerms && (
                <div className="text-white-900 bg-blue-dark text-sm p-2 rounded-sm">
                  To continue, please confirm you have read our terms and
                  conditions
                </div>
              )}

              {/* <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
                <Field className="flex items-center gap-2 p-4 ">
                  <Controller
                    name="over18"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
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
                    )}
                  />

                  <Label className="font-semibold">
                    You have access to the email address linked to your google
                    account
                  </Label>
                </Field>
              </article> */}

              {/* <article className="my-4 bg-white-900 space-x-3 space-y-0 rounded-md border shadow">
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
                    I agree to TutorSeekers terms and conditions.
                  </Label>
                </Field>
              </article> */}

              <div className="flex justify-between md:col-span-2">
                <Button
                  className="mt-6 w-28"
                  variant="outliner"
                  type="button"
                  disabled={isSubmitting}
                  onClick={onBack}
                >
                  Back
                </Button>

                <Button
                  className="mt-6 w-28"
                  variant="outliner"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="bg-blue-normal rounded-b-lg flex flex-row justify-end py-6"></CardFooter>
        </Card>
      </div>
    </div>
  );
}
