"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Select } from "@headlessui/react";
import { Field, Input, Label } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  setParentDetails,
  selectAll,
} from "@/lib/features/register/registerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerTutorSchema = z.object({
  preferredName: z
    .string()
    .min(2, { message: "Must be at least 2 characters long" })
    .max(50, { message: "Must be 50 characters or less" }),
  town: z
    .string()
    .min(1, { message: "Enter your town / city" })
    .max(80, { message: "Must be 80 or less characters" }),
  postcode: z
    .string()
    .min(3, { message: "Enter a valid postcode" })
    .max(11, { message: "Must be 11 characters or less" }),
});

type FormFields = z.infer<typeof registerTutorSchema>;

export function RegisterStudent() {
  const dispatch = useAppDispatch();
  const regBuffer = useAppSelector(selectAll);

  const router = useRouter();

  if (!regBuffer.token) {
    router.push("/auth/register");
  }

  if (!["Student", "Parent", "Tutor"].includes(regBuffer.accountType)) {
    router.push("/auth/register-account-type");
  }

  console.log("RegBuffer");
  console.log(regBuffer);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(registerTutorSchema),
    defaultValues: {
      preferredName: regBuffer.preferredName,
      town: regBuffer.town,
      postcode: regBuffer.postcode,
    },
  });

  console.log("errors");
  console.log(errors);

  const onBack = () => {
    router.push("/auth/register-account-type");
  };

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
      dispatch(
        setParentDetails({
          preferredName: data.preferredName,
          town: data.town,
          postcode: data.postcode,
        }),
      );
      router.push("/auth/register-checks");
    } catch (error) {
      setError("root", {
        message: "This email is already taken.",
      });
    }
  };

  return (
    <div className="py-12 bg-white-900">
      <div className="shadow-lg max-w-7xl w-11/12 m-auto mx-auto">
        <Card className="rounded-lg">
          <CardHeader className="bg-blue-normal rounded-t-lg text-white-900">
            <CardTitle className="text-card-header-fg text-2xl text-center">
              Student Details
            </CardTitle>
            <CardDescription className="text-base text-center text-brown-600">
              Something here ...
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-blue-light py-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-my-white grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2"
            >
              <Field className="w-full">
                <Label className="text-sm">Preferred Name *</Label>
                <Input
                  {...register("preferredName")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Enter your preferred name."
                />
                {errors.preferredName && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.preferredName.message}
                  </div>
                )}
              </Field>

              <div></div>

              <Field className="w-full">
                <Label className="text-sm">Town *</Label>
                <Input
                  {...register("town")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Enter your town / city"
                />
                {errors.town && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.town.message}
                  </div>
                )}
              </Field>

              <Field className="w-full">
                <Label className="text-sm">Postcode *</Label>
                <Input
                  {...register("postcode")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Enter your postcode"
                />
                {errors.postcode && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.postcode.message}
                  </div>
                )}
              </Field>

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
                  Add Details
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="bg-blue-normal rounded-b-lg flex flex-row justify-end py-6">
            {/* <Button variant="outline" className="text-white-900">
              Register
            </Button> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
