"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = () => {
    console.log("Login validation passed");
  };

  return (
    <main>
      <div className="bg-gradient-to-r from-logo-blue-normal">
        <h2>Variant Test</h2>
        <p>Hello this is a tester</p>
        <p>Hello this is another tester</p>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <h2>Variant Test</h2>
        <p>Hello this is a tester</p>
        <p>Hello this is another tester</p>
      </div>

      <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
        <h2>Variant Test</h2>
        <p>Hello this is a tester</p>
        <p>Hello this is another tester</p>
      </div>

      <div className="grid">
        <div className="bg-logo-blue-light">Hello</div>
        <div className="bg-logo-blue-normal">Hello</div>
        <div className="bg-logo-blue-dark">Hello</div>
      </div>

      <h1>Components</h1>

      <h2>Buttons</h2>
      {/* <Button variant={}>Sign In</Button> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  This is the email you siged up with.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </main>
  );
}
