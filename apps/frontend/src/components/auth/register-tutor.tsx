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
  setTutorDetails,
  selectAll,
} from "@/lib/features/register/registerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Gender = [
  { key: "ns", value: "Select title" },
  { key: "f", value: "Female" },
  { key: "m", value: "Male" },
  { key: "p", value: "Prefer not to say" },
] as const;

const GenderValues = ["ns", "f", "m", "p"] as const;

const Title = [
  { key: "ns", value: "Select gender" },
  { key: "miss", value: "Miss" },
  { key: "mrs", value: "Mrs" },
  { key: "ms", value: "Ms" },
  { key: "mr", value: "Mr" },
  { key: "mx", value: "Mx" },
  { key: "dr", value: "Dr" },
  { key: "prof", value: "Prof" },
] as const;

const TitleValues = [
  "ns",
  "miss",
  "mrs",
  "ms",
  "mr",
  "mx",
  "dr",
  "prof",
] as const;

const registerTutorSchema = z.object({
  title: z
    .enum(TitleValues)
    .refine((val) => val !== "ns", { message: "Please select a title" }),
  firstname: z
    .string()
    .min(1, { message: "Enter your first name" })
    .max(50, "Must be 50 characters or less"),
  lastname: z
    .string()
    .min(1, { message: "Enter your last name" })
    .max(50, "Must be 50 characters or less"),
  gender: z
    .enum(GenderValues)
    .refine((val) => val !== "ns", { message: "Please select a gender" }),
  preferredName: z
    .string()
    .min(2, { message: "Must be at least 2 characters long" })
    .max(50, { message: "Must be 50 characters or less" }),

  // phoneNumber: z.string().regex(/^\d{10}$/)
  phone: z
    .string()
    .max(20, { message: "Must be 20 or less characters" })
    .refine((val) => val.length === 0 || val.length >= 6, {
      message: "Must be 5 - 20 characters",
    }),
  mobile: z
    .string()
    .max(20, { message: "Must be 20 or less characters" })
    .refine((val) => val.length === 0 || val.length >= 6, {
      message: "Must be 5 - 20 characters",
    }),
  address1: z
    .string()
    .min(1, { message: "Enter your address" })
    .max(80, { message: "Must be 80 or less characters" }),
  address2: z.string().max(80, { message: "Must be 80 or less characters" }),
  town: z
    .string()
    .min(1, { message: "Enter your town / city" })
    .max(80, { message: "Must be 80 or less characters" }),
  county: z
    .string()
    .min(1, { message: "Enter your county" })
    .max(80, { message: "Must be 80 or less characters" }),
  postcode: z
    .string()
    .min(3, { message: "Enter a valid postcode" })
    .max(11, { message: "Must be 11 characters or less" }),
});

type FormFields = z.infer<typeof registerTutorSchema>;

export function RegisterTutor() {
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
      title: regBuffer.title,
      firstname: regBuffer.firstname,
      lastname: regBuffer.lastname,
      gender: regBuffer.gender,
      preferredName: regBuffer.preferredName,
      phone: regBuffer.phone,
      mobile: regBuffer.mobile,
      address1: regBuffer.address1,
      address2: regBuffer.address2,
      town: regBuffer.town,
      county: regBuffer.county,
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
        setTutorDetails({
          title: data.title,
          firstname: data.firstname,
          lastname: data.lastname,
          gender: data.gender,
          preferredName: data.preferredName,
          phone: data.phone,
          mobile: data.mobile,
          address1: data.address1,
          address2: data.address2,
          town: data.town,
          county: data.county,
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
              Tutor Details
            </CardTitle>
            <CardDescription className="text-base text-center text-brown-600">
              Enter your details, we require these in order to run safeguarding
              checks
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-blue-light py-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-my-white grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2"
            >
              <Field className="w-full">
                <Label className="text-sm">Title *</Label>
                <Select
                  {...register("title")}
                  required
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                >
                  <option value="ns">Select title</option>
                  <option value="miss">Miss</option>
                  <option value="mrs">Mrs</option>
                  <option value="ms">Ms</option>
                  <option value="mr">Mr</option>
                  <option value="mx">Mx</option>
                  <option value="dr">Dr</option>
                  <option value="prof">Prof</option>
                </Select>
                {errors.title && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.title.message}
                  </div>
                )}
              </Field>

              <Field className="w-full">
                <Label className="text-sm">Gender *</Label>
                <Select
                  {...register("gender")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                >
                  <option value="ns">Select gender</option>
                  <option value="f">Female</option>
                  <option value="m">Male</option>
                  <option value="p">Prefer not to say</option>
                </Select>
                {errors.gender && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.gender.message}
                  </div>
                )}
              </Field>

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
                <Label className="text-sm">First Name *</Label>
                <Input
                  {...register("firstname")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Enter your first name."
                />
                {errors.firstname && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.firstname.message}
                  </div>
                )}
              </Field>

              <Field className="w-full">
                <Label className="text-sm">Last Name *</Label>
                <Input
                  {...register("lastname")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Enter your last name."
                />
                {errors.lastname && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.lastname.message}
                  </div>
                )}
              </Field>

              <Field className="w-full">
                <Label className="text-sm">Phone</Label>
                <Input
                  {...register("phone")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Enter your phone number."
                />
                {errors.phone && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.phone.message}
                  </div>
                )}
              </Field>

              <Field className="w-full">
                <Label className="text-sm">Mobile</Label>
                <Input
                  {...register("mobile")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Enter your mobile number."
                />
                {errors.mobile && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.mobile.message}
                  </div>
                )}
              </Field>

              <Field className="w-full">
                <Label className="text-sm">Address *</Label>
                <Input
                  {...register("address1")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Enter first line of address"
                />
                {errors.address1 && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.address1.message}
                  </div>
                )}
              </Field>

              <Field className="w-full">
                <Label className="text-sm">&nbsp;</Label>
                <Input
                  {...register("address2")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  type="text"
                />
                {errors.address2 && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.address2.message}
                  </div>
                )}
              </Field>

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
                <Label className="text-sm">County *</Label>
                <Input
                  {...register("county")}
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Enter county"
                />
                {errors.county && (
                  <div className="text-white-900 bg-blue-dark text-sm my-2 px-2 py-1 rounded-sm">
                    {errors.county.message}
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
