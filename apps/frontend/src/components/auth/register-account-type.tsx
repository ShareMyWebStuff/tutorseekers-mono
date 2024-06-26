"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SelectInput, {
  OptionsType,
  OptionsValue,
  SelectInputStateType,
} from "../general/select-input";
import { Field, Input, Label } from "@headlessui/react";
import {
  setAccountType,
  resetRegister,
} from "@/lib/features/register/registerSlice";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { selectAll } from "@/lib/features/register/registerSlice";

export function RegisterAccountType() {
  const AccTypeData: OptionsValue[] = [
    {
      type: "value",
      key: 0,
      value: "Select account type",
    },
    {
      type: "value",
      key: 1,
      value: "Parent",
    },
    {
      type: "value",
      key: 2,
      value: "Student",
    },
    {
      type: "value",
      key: 3,
      value: "Tutor",
    },
  ];

  const regBuffer = useAppSelector(selectAll);

  const router = useRouter();
  if (!regBuffer.token) {
    router.push("/auth/register");
  }

  const [accType, setAccType] = useState<SelectInputStateType>({
    accountType: {
      selectedValue: regBuffer.accountType, // AccTypeData[0].value,
      options: AccTypeData,
    },
  });
  const [errors, setErrors] = useState("");

  // const regBuffer = useAppSelector(selectAll);
  const dispatch = useAppDispatch();

  console.log("regBuffer");
  console.log(regBuffer);

  console.log("accType");
  console.log(accType);

  // const imageSrc = "/images/landing/banner-bg.png";
  // const headerLabel = "Register with TutorSeekers";
  // const subHeader = "Create your account - TODAY";

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState("");

  const onSubmit = () => {
    if (
      !["Parent", "Student", "Tutor"].includes(
        accType.accountType.selectedValue,
      )
    ) {
      setErrors("Please select the type of account you require");
      return;
    } else {
      setErrors("");
    }

    dispatch(
      setAccountType({
        accountType: accType.accountType.selectedValue,
      }),
    );

    router.push(
      "/auth/register-" + accType.accountType.selectedValue.toLowerCase(),
    );
  };

  return (
    <div className="py-12 bg-white-900">
      <div className="shadow-lg max-w-[48rem] mx-auto">
        <Card className="rounded-lg">
          <CardHeader className="bg-blue-normal rounded-t-lg text-white-900">
            <h2 className="text-lg text-center">Select Account Type</h2>
          </CardHeader>
          <CardContent className="bg-blue-light py-6">
            <form>
              <p className="my-6">
                Please specify the type of account you require.
              </p>

              <Field className="z-2000 my-6">
                <SelectInput
                  label="Account Type"
                  name="accountType"
                  title="Select account type"
                  selectInputClass=""
                  state={accType.accountType}
                  updateState={setAccType}
                  emptyDataValue="Select account type"
                  disabled={false}
                  loading={false}
                />
                {errors && (
                  <div className="my-4 bg-blue-normal text-white-900 p-2 rounded-xl text-sm">
                    {errors}
                  </div>
                )}
              </Field>
            </form>

            <h4 className="font-semibold my-6">Parent</h4>
            <p>
              Select this account type if you are a parent looking to find
              tuition, online courses or help with your childs education.{" "}
            </p>
            <h4 className="font-semibold my-4">Student</h4>
            <p>
              Select this account type if you are a parent looking to find
              tuition, online courses or help with your childs education.{" "}
            </p>
            <h4 className="font-semibold my-4">Tutor</h4>
            <p>
              If you are looking to tutor, host your courses or run your tuition
              business then select this account type. We perform many checks on
              this account type for safeguarding reasons.
            </p>

            <div className="mt-6 flex justify-end">
              <Button
                variant="outliner"
                className=""
                onClick={() => {
                  onSubmit();
                }}
              >
                Next
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-blue-normal rounded-b-lg flex flex-row justify-end py-6">
            {/* <Button
              variant="cancel"
              className="mx-auto bg-error border-error text-white-900"
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Back
            </Button> */}
            {/* <Button
              variant="outline"
              className="text-white-900"
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Back
            </Button> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
