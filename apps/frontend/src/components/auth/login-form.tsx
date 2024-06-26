"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Label } from "@headlessui/react";
import { Google } from "./google_old";

export function LoginForm() {
  const router = useRouter();

  const imageSrc = "/images/landing/banner-bg.png";
  const headerLabel = "Welcome to TutorSeekers";
  const subHeader = "Find help with all your tutition needs - TODAY";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            "p-6 bg-card-header-bg text-card-header-fg w-full " +
            (imageSrc
              ? "rounded-r-xl md:rounded-l-none rounded-l-xl"
              : "rounded-xl")
          }
        >
          <h6 className="font-sans text-2xl antialiased font-semibold leading-relaxed tracking-normal text-card-header-fg text-center">
            {headerLabel}
          </h6>
          {subHeader && (
            <h4 className="my-8 font-sans text-base antialiased leading-snug tracking-normal text-my-white text-center">
              {subHeader}
            </h4>
          )}

          <Google />

          <div className="flex items-center justify-between mt-4 text-white-700">
            <span className="w-1/5 border-b-1 border-white-700 lg:w-1/4"></span>
            <span className="text-xs text-center uppercase">
              or login with email
            </span>
            <span className="w-1/5 border-b-1 border-white-700 lg:w-1/4"></span>
          </div>

          <Field className="w-full mt-4">
            <Label className="text-sm">Email</Label>
            <Input
              className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
              name="email"
              placeholder="sabrina@example.com"
              autoComplete="off"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </Field>

          <Field className="w-full mt-4">
            <Label className="text-sm">Password</Label>
            <Input
              className="p-2 w-full border-1 border-input-border rounded-lg cursor-pointer text-blue-dark focus:border-blue-dark focus:outline-none focus:ring-0"
              name="password"
              placeholder="********"
              autoComplete="off"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </Field>

          <Button
            className="w-full mt-6"
            variant="outlineblue"
            type="submit"
            // size="icon"
            //   onClick={onSearch}
            //   disabled={btnDisabled}
          >
            Sign In
          </Button>

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
            Not on TutorSeekers?{" "}
            <span
              className="text-gold cursor-pointer"
              onClick={() => {
                router.push("/auth/register");
              }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
