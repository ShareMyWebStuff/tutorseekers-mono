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

{
  /* <div className="bg-scroll bg-no-repeat bg-cover bg-[url('/images/general/bg.png')]"> */
}

export function TutorSelector() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-light from-0% via-white-900 via-50% to-blue-light to-90% pt-8 text-black pb-12">
        <div className="w-[800px] bg-white-900 mx-auto my-12">
          <h1 className="text-3xl text-center py-12">
            Shaping a world through education.
          </h1>

          <div className="grid sm:grid-cols-2 gap-2">
            <div className="block">
              <input
                type="radio"
                name="radio-in-form"
                className="hidden checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                id="radio-in-form-1"
              />
              <label
                htmlFor="radio-in-form-1"
                className="flex p-3 block w-full bg-white border border-gray-200 rounded-md text-sm "
              >
                <span className="border border-gray-300 rounded-full mr-2 w-4 h-4 mt-0.5"></span>
                <h5 className="text-sm text-gray-500">Face to Face</h5>
              </label>
            </div>
            <div className="block">
              <input
                type="radio"
                name="radio-in-form"
                className="hidden checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                id="radio-in-form-2"
                checked
              />
              <label
                htmlFor="radio-in-form-2"
                className="flex p-3 block w-full bg-white border border-gray-200 rounded-md text-sm "
              >
                <span className="border border-gray-300 rounded-full mr-2 w-4 h-4 mt-0.5"></span>
                <h5 className="text-sm text-gray-500">Online</h5>
              </label>
            </div>
          </div>
          {/*  */}
        </div>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
