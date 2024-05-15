"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Radio, RadioGroup } from "@headlessui/react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Select } from "@headlessui/react";
import { Field, Input, Label } from "@headlessui/react";
import { CircleCheckBig } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SelectedSubject {
  id: number;
  subject: string;
}

const subjects = [
  { id: 1, subject: "Design and Communication" },
  { id: 2, subject: "French" },
  { id: 3, subject: "German" },
  { id: 4, subject: "Spanish" },
  { id: 5, subject: "Portuguese" },
  { id: 6, subject: "Russian" },
  { id: 7, subject: "Japanese" },
  { id: 8, subject: "Korean" },
];

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
});

export function TutorSelector() {
  const [lessonType, setLessonType] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<SelectedSubject>(
    subjects[0],
  );
  const [query, setQuery] = useState("");

  const filteredSubjects =
    query === ""
      ? subjects
      : subjects.filter((subject) => {
          return subject.subject.toLowerCase().includes(query.toLowerCase());
        });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Hello");
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  // <div className="bg-landing-tutor-selector bg-no-repeat bg-cover bg-center bg-blue-100">

  // className="basis-1/2 group relative flex flex-row justify-between cursor-pointer rounded-l-lg p-3 text-black border-b-2 border-black shadow-xl transition focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-red-500"
  // className="basis-1/2 group relative flex flex-row justify-between cursor-pointer rounded-r-lg p-3 text-black bg-white-500 shadow-xl transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-red-500"

  return (
    <div className="bg-landing-tutor-selector bg-no-repeat bg-cover bg-center bg-blue-100 text-black">
      <h1 className="text-4xl text-center text-white-900 my-16">
        Shaping a world through education.
      </h1>

      <form className="m-auto mb-16 w-[800px] my-10 rounded-xl p-4 bg-white-900 grid grid-cols-3 gap-2">
        <RadioGroup
          value={lessonType}
          onChange={setLessonType}
          aria-label="Lesson type"
          className="w-full flex flex-row col-span-3"
        >
          <Radio
            key={0}
            value={"In Person"}
            className="basis-1/2 group relative flex flex-row justify-center content-end cursor-pointer p-3 text-black border-black shadow-xl transition focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white hover:font-bold data-[checked]:border-b-2"
          >
            In Person
            <CircleCheckBig className="ml-2 size-4 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
          </Radio>
          <Radio
            key={1}
            value={"Online"}
            className="basis-1/2 group relative flex flex-row justify-center content-end cursor-pointer p-3 text-black border-black shadow-xl transition focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white hover:font-bold data-[checked]:border-b-2"
          >
            <span>Online</span>
            <CircleCheckBig className="ml-2 size-4 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
          </Radio>
        </RadioGroup>

        <Field>
          <Label className="text-sm">Subject</Label>
          <Combobox
            value={selectedSubject}
            onChange={setSelectedSubject}
            onClose={() => setQuery("")}
          >
            <ComboboxInput
              aria-label="Assignee"
              displayValue={(subject: SelectedSubject) => subject?.subject}
              onChange={(event) => setQuery(event.target.value)}
              className="p-2 rounded-lg w-full border"
            />
            <ComboboxOptions
              anchor="bottom start"
              className="empty:hidden mt-2 w-[320px] rounded-lg p-2  bg-white"
            >
              {filteredSubjects.map((subject) => (
                <ComboboxOption
                  key={subject.id}
                  value={subject}
                  className="data-[focus]:bg-blue-100 data-[focus]:rounded-lg p-2"
                >
                  {subject.subject}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
        </Field>

        <Field>
          <Label className="text-sm">Level</Label>
          <Select
            className="w-full p-2 rounded-lg border data-[hover]:shadow data-[focus]:bg-blue-100"
            name="status"
            aria-label="Project status"
          >
            <option value="all">All Levels</option>
            <optgroup key={1} label={"Academic"} className="mt-2 rounded-t-lg">
              <option value="primary">Primary (Key stage 1-2)</option>
              <option value="secondary">Secondary (Key stage 3)</option>
              <option value="gcse">GCSE / Nats 3.5</option>
              <option value="a-level">A-Level / Higher</option>
              <option value="ib">IB</option>
              <option value="degree">Degree+</option>
            </optgroup>
            <optgroup key={2} label={"Level"} className="mt-2 rounded-t-lg">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </optgroup>
          </Select>
        </Field>

        <Field>
          <Label className="text-sm">Location</Label>
          <Input
            className="p-2 rounded-lg border w-full"
            name="full_name"
            placeholder="Your town / postcode"
          />
        </Field>
      </form>
    </div>
  );
}
