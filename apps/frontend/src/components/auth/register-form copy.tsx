"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, Input, Label } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Google } from "./google_old";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
  setRegisterEmail,
  resetRegister,
} from "@/lib/features/register/registerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Must be between 8-20 characters long." })
      .max(20, { message: "Must be between 8-20 characters long." })
      .regex(passwordValidation, {
        message:
          "Password must contain at least 1 uppercase character, a number and one of the following #?!@$%^&*-",
      }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

type FormFields = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [pwdHide, setPwdHide] = useState(true);
  const [confirmHide, setConfirmHide] = useState(true);

  const imageSrc = "/images/landing/banner-bg.png";
  const headerLabel = "Register with TutorSeekers";
  const subHeader = "Create your account - TODAY";

  const dispatch = useAppDispatch();
  // const cookieDisplay = useAppSelector(selectDisplay);

  useEffect(() => {
    dispatch(resetRegister());
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "dave@harmonydata.co.uk",
      password: "Sybase01!",
      confirm: "Sybase01!",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // console.log("HERE - onsubmit**");
    // console.log(data);
    // console.log("errors");
    // console.log(errors);
    try {
      // Can check if the email address has been used
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // setError("email", {
      //   message: "This email is already taken.",
      // });
      dispatch(
        setRegisterEmail({
          email: data.email,
          password: data.password,
          confirm: data.confirm,
          googleEmail: null,
          googleAcc: false,
          googleId: null,
          token: "SET THIS LATER",
        }),
      );
      router.push("/auth/register-account-type");
    } catch (error) {
      setError("root", {
        message: "This email is already taken.",
      });
    }
  };

  return (
    <div className="py-12 bg-white-900">
      <div className="relative flex bg-clip-border rounded-xl bg-blue-normal shadow-lg max-w-[48rem] flex-row mx-auto border-2">
        {imageSrc && (
          <div className="relative w-1/2 m-0 overflow-hidden rounded-r-none bg-clip-border rounded-xl shrink-0 hidden md:block">
            <Image
              src="/images/landing/banner-bg.png"
              alt="card-image"
              className="object-cover h-full"
              width={1927}
              height={1061}
              priority={true}
            />
          </div>
        )}

        <div
          className={
            "p-6 w-full " +
            (imageSrc
              ? "rounded-r-xl md:rounded-l-none rounded-l-xl"
              : "rounded-xl")
          }
        >
          <h6 className="font-sans text-2xl antialiased font-semibold leading-relaxed tracking-normal text-center">
            {headerLabel}
          </h6>
          {subHeader && (
            <h4 className="my-8 font-sans text-base antialiased leading-snug tracking-normal text-center">
              {subHeader}
            </h4>
          )}

          <Google />

          <div className="flex items-center justify-between mt-4 text-white-700">
            <span className="w-2/5 border-b-1 border-white-700 lg:w-1/4"></span>
            <span className="text-xs text-center uppercase">or</span>
            <span className="w-2/5 border-b-1 border-white-700 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Field className="w-full mt-4">
              <Label className="text-sm">Email</Label>
              <Input
                {...register("email")}
                className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                type="email"
                placeholder="sabrina@example.com"
              />
            </Field>
            {errors.email && (
              <div className="text-gold text-sm">{errors.email.message}</div>
            )}

            <Field className="w-full mt-4">
              <Label className="text-sm">Password</Label>
              <div className="mb-4 flex">
                <Input
                  {...register("password")}
                  type={pwdHide ? "password" : "text"}
                  placeholder="Enter your Password"
                  className="p-2 pr-10 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  autoComplete="off"
                />
                <span
                  className="flex justify-around items-center"
                  onClick={() => setPwdHide((prev) => !prev)}
                >
                  {!pwdHide && (
                    <FaEye
                      className="absolute mr-10 text-blue-normal"
                      size={25}
                    />
                  )}
                  {pwdHide && (
                    <FaEyeSlash
                      className="absolute mr-10 text-blue-normal"
                      size={25}
                    />
                  )}
                </span>
              </div>
            </Field>
            {errors.password && (
              <div className="text-gold text-sm">{errors.password.message}</div>
            )}

            <Field className="w-full mt-4">
              <Label className="text-sm">Confirm password</Label>
              <div className="mb-4 flex">
                <Input
                  {...register("confirm")}
                  type={confirmHide ? "password" : "text"}
                  placeholder="********"
                  className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
                  autoComplete="off"
                />
                <span
                  className="flex justify-around items-center"
                  onClick={() => setConfirmHide((prev) => !prev)}
                >
                  {!confirmHide && (
                    <FaEye
                      className="absolute mr-10 text-blue-normal"
                      size={25}
                    />
                  )}
                  {confirmHide && (
                    <FaEyeSlash
                      className="absolute mr-10 text-blue-normal"
                      size={25}
                    />
                  )}
                </span>
              </div>
            </Field>
            {errors.confirm && (
              <div className="text-gold text-sm">{errors.confirm.message}</div>
            )}

            <Button
              className="w-full mt-6"
              variant="outlineblue"
              type="submit"
              disabled={isSubmitting}
            >
              Create an account
            </Button>
          </form>

          <p className="text-sm my-6">
            By continuing, you agree to TutorSeekers{" "}
            <span
              className="text-gold cursor-pointer"
              onClick={() => {
                router.push("/legal?legal=terms");
              }}
            >
              Terms of Service
            </span>
            ,{" "}
            <span
              className="text-gold cursor-pointer"
              onClick={() => {
                router.push("/legal?legal=privacy");
              }}
            >
              Privacy policy
            </span>{" "}
            and{" "}
            <span
              className="text-gold cursor-pointer"
              onClick={() => {
                router.push("/legal?legal=cookies");
              }}
            >
              Cookie Use
            </span>
            .
          </p>
          <hr />
          <p
            onClick={() => {
              console.log("Register");
            }}
            className="text-center text-sm mt-4"
          >
            Already a member?{" "}
            <span
              className="text-gold cursor-pointer"
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
