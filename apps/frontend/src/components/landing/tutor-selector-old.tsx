"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchCheckIcon, Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// export function TutorSelector() {
//   const [error, setError] = useState<string | undefined>("");
//   const [success, setSuccess] = useState<string | undefined>("");
//   const [isPending, startTransition] = useTransition();

//   const form = useForm<z.infer<typeof RegisterSchema>>({
//     resolver: zodResolver(RegisterSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
//     setError("");
//     setSuccess("");

//     // startTransition(() => {
//     //   login(values, callbackUrl)
//     //     .then((data) => {
//     //       if (data?.error) {
//     //         form.reset();
//     //         setError(data.error);
//     //       }

//     //       if (data?.success) {
//     //         form.reset();
//     //         setSuccess(data.success);
//     //       }

//     //       // if (data?.twoFactor) {
//     //       //   setShowTwoFactor(true);
//     //       // }
//     //     })
//     //     .catch(() => setError("Something went wrong"));
//     // });
//   };

//   return (
//     <>
//       <div className="py-12">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6 text-my-white"
//           ></form>
//         </Form>
//       </div>
//     </>
//   );
// }

export function TutorSelector() {
  return (
    <>
      <div className="bg-scroll bg-[url('/images/knowledge-center/physics-1.jpg')] h-[972px] bg-yellow-500">
        <form class="max-w-sm mx-auto">
          <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="bg-gradient-to-r from-blue-light from-0% via-white-900 via-50% to-blue-light to-90% pt-8 text-black"></div>

      <div className="flex justify-between py-3 px-6 bg-gray-50 border-b">
        <h1>Shaping a world through education.</h1>
        <div className="grid w-[40rem] grid-cols-2 gap-2 rounded-xl p-2 bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% text-sm">
          <div>
            <input
              type="radio"
              name="option"
              id="1"
              value="1"
              className="peer hidden"
              checked
            />
            <label
              htmlFor="1"
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-light peer-checked:font-bold peer-checked:text-black"
            >
              Face to Face
            </label>
          </div>

          <div>
            <input
              type="radio"
              name="option"
              id="2"
              value="2"
              className="peer hidden"
            />
            <label
              htmlFor="2"
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-light peer-checked:font-bold peer-checked:text-black"
            >
              Online
            </label>
          </div>
        </div>

        {/* <form action="" className="w-full max-w-md">
          <div className="relative flex items-center text-gray-400 focus-within:text-gray-800">
            <Mail className="w-5 h-5 absolute ml-3 pointer-events-none" />

            <input
              type="email"
              name="email"
              id="email"
              placeholder="email@kemuscorp.com"
              aria-label="Email address"
              autoComplete="off"
              className="pr-3 pl-10 px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-md  ring-gray-300 focus:ring-gray-500 focus:ring-2 "
            />
          </div>
        </form> */}
      </div>

      {/* <label
        htmlFor="email"
        className="relative text-gray-400 focus-within:text-gray-600 block"
      >
        <Mail className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3" />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="email@kemuscorp.com"
          className="form-input w-full"
        />
      </label> */}

      <Card>
        <CardHeader>
          <CardTitle>Shaping a world through education.</CardTitle>
        </CardHeader>

        <CardContent className="flex ">
          <Tabs defaultValue="inperson" className="w-[600px] ">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="inperson">
                <span className="text-base">In-Person</span>
              </TabsTrigger>
              <TabsTrigger value="online">Online</TabsTrigger>
            </TabsList>

            <TabsContent value="inperson">
              <Card>
                <CardHeader>
                  <CardTitle></CardTitle>
                </CardHeader>
                <CardContent className=" ">
                  <div className="relative flex items-center text-gray-400 focus-within:text-gray-800">
                    <Mail className="w-5 h-5 absolute ml-3 pointer-events-none" />

                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email@kemuscorp.com"
                      aria-label="Email address"
                      autoComplete="off"
                      className="pr-3 pl-10 px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-md border-none ring-gray-300 focus:ring-gray-500 focus:ring-2 "
                    />
                  </div>

                  <div className="mr-2">
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="mr-2">
                    <Input id="username" defaultValue="@peduarte" />
                  </div>

                  <Button variant="outline" size="icon">
                    <SearchCheckIcon className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="online">
              <Card>
                <CardHeader>
                  <CardTitle>Shaping a world through education.</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </>
  );
}
