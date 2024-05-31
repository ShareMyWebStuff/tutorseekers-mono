"use client";

import { useState, useEffect } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import InputDropDown, {
  DropdownItem,
  DropdownState,
  DropdownStateType,
} from "@/components/general/input-dropdown";
import SelectInput, {
  OptionsType,
  OptionsValue,
  SelectInputStateType,
} from "../general/select-input";
import { Button } from "../ui/button";
import { Field, Input, Label } from "@headlessui/react";
import { Search } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { tuitionSubjects, tuitionLevels } from "@/constants/subjects";

export function TutorSelector() {
  const EmptyData: OptionsValue = {
    type: "value",
    key: 0,
    value: "No subject selected",
  };

  const [tuitionLocation, setTuitionLocation] = useState("In Person");

  const [subjectLookup, setSubjectLookup] = useState<DropdownStateType>({
    subject: {
      dropdownItems: [],
      value: "",
      matched: false,
    },
  });
  let disabled = false;

  const [level, setLevel] = useState<SelectInputStateType>({
    level: {
      selectedValue: EmptyData.value,
      options: [EmptyData],
    },
  });

  const [location, setLocation] = useState("");

  const [formErrors, setFormErrors] = useState({
    errors: false,
    errorMsgs: {},
  });

  console.log("Level");
  console.log(level);

  //
  // On initial load create subject list for the dropdown
  //
  useEffect(() => {
    const subs: DropdownItem[] = tuitionSubjects.map((subject) => {
      return { lookupId: subject.subjectId, lookup: subject.subject };
    });

    setSubjectLookup((prev: DropdownStateType): DropdownStateType => {
      return { ...prev, subject: { ...prev.subject, dropdownItems: subs } }; // , disabled: false },
    });
  }, []);

  //
  // When the choosen subject changes, create the subject level list.
  // If the user selects Maths -> set the level dopdown to show the academic levels
  //
  useEffect(() => {
    const AllLevels: OptionsValue = {
      type: "value",
      key: 0,
      value: "All levels",
    };

    if (subjectLookup.subject.matched) {
      const levelOptions: OptionsType[] = [];
      let levelOption: OptionsType = {
        type: "group",
        key: 1,
        groupName: "",
        groupDesc: [],
      };

      // Get the subject
      const foundSubjects = tuitionSubjects.find(
        (sub) => sub.subject === subjectLookup.subject.value,
      );

      if (!foundSubjects) {
        setLevel((prev: SelectInputStateType): SelectInputStateType => {
          return { ...prev, level: { selectedValue: "", options: [] } };
        });
      } else {
        // Get the categories the subject is held in
        foundSubjects.categories.forEach((cat, idx) => {
          // Look up the subjects levels
          const foundLevel = tuitionLevels[cat.level];

          if (foundLevel && foundLevel.type === "value") {
            levelOptions.push({
              type: foundLevel.type,
              key: foundLevel.key,
              value: foundLevel.name,
            });
          } else if (foundLevel && foundLevel.type === "group") {
            levelOption = {
              type: foundLevel.type,
              key: foundLevel.key,
              groupName: foundLevel.name,
              groupDesc: [],
            };

            for (let item of foundLevel.items) {
              levelOption.groupDesc.push({
                key: item.subjectLevelItemId + 10000,
                value: item.levelItem,
              });
            }
            levelOptions.push(levelOption);
          } else {
            setLevel((prev: SelectInputStateType): SelectInputStateType => {
              return { ...prev, level: { selectedValue: "", options: [] } };
            });
            return;
          }
        });

        if (levelOptions.length > 1) {
          levelOptions.unshift(AllLevels);
        }
        setLevel((prev: SelectInputStateType): SelectInputStateType => {
          return {
            ...prev,
            level: { selectedValue: "", options: levelOptions },
          };
        });
      }
    } else {
      setLevel((prev: SelectInputStateType): SelectInputStateType => {
        return { ...prev, level: { selectedValue: "", options: [] } };
      });
    }
  }, [subjectLookup.subject, subjectLookup.subject.matched]);

  const onSearch = () => {
    console.log("Here");
    const errorMsgs: { [key: string]: string } = {};

    if (!subjectLookup.subject.matched) {
      errorMsgs["subject"] = "Please enter a valid subject.";
    }
    if (subjectLookup.subject.value === "No subject selected") {
      errorMsgs["level"] = "Please enter a valid level.";
    }
    if (tuitionLocation === "In Person" && location.length < 2) {
      errorMsgs["location"] = "Please enter a valid postcode.";
    }

    if (Object.keys(errorMsgs).length > 0) {
      setFormErrors({ errors: true, errorMsgs });
      // } else {
      //     history.push(  { pathname: '/tutor-search', search: '', state:{ tuitionLocation, subject, level, location } })
    }
  };

  const lvlDisabled = !subjectLookup.subject.matched;
  const btnDisabled = !(
    (tuitionLocation === "In Person" &&
      subjectLookup.subject.matched &&
      location.length >= 2) ||
    (tuitionLocation === "Online" && subjectLookup.subject.matched)
  );

  return (
    <div className="bg-landing-tutor-selector bg-no-repeat bg-cover bg-center bg-blue-100 text-black">
      <h1 className="text-4xl text-center text-white-900 my-20">
        Shaping a world through education.
      </h1>

      <form className="m-auto mb-28 w-4/5 max-w-[950px] rounded-xl p-4 bg-white-900 grid grid-cols-12 gap-2 items-end">
        <RadioGroup
          value={tuitionLocation}
          onChange={setTuitionLocation}
          aria-label="Lesson type"
          className="w-full flex flex-row col-span-12"
        >
          <Radio
            key={0}
            value={"In Person"}
            className="basis-1/2 group relative flex flex-row items-center justify-center content-end cursor-pointer p-3 text-black border-black shadow-xl transition focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white hover:font-bold data-[checked]:border-b-2"
          >
            In Person
            <CircleCheckBig className="ml-2 size-4 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
          </Radio>
          <Radio
            key={1}
            value={"Online"}
            className="basis-1/2 group relative flex flex-row items-center justify-center content-end cursor-pointer p-3 text-black border-black shadow-xl transition focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white hover:font-bold data-[checked]:border-b-2"
          >
            <span>Online</span>
            <CircleCheckBig className="ml-2 size-4 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
          </Radio>
        </RadioGroup>

        <Field className="col-span-12 md:col-span-6 lg:col-span-4">
          <InputDropDown
            name="subject"
            placeholder="Enter a Subject"
            dropdownMinLength={1}
            InputDropDownClass="mt-2"
            label="Subject"
            state={subjectLookup.subject}
            updateState={setSubjectLookup}
            disabled={disabled}
            loading={false}
          />
        </Field>

        <Field className="col-span-12 md:col-span-6 lg:col-span-4 z-2000">
          <SelectInput
            label="Tuition Level"
            name="level"
            title="Select subject level"
            selectInputClass="mt-2"
            state={level.level}
            updateState={setLevel}
            emptyDataValue="No subject selected"
            disabled={lvlDisabled}
            loading={disabled}
          />
        </Field>

        <Field
          className={
            (tuitionLocation === "Online" ? "invisible " : "") +
            "col-span-12 md:col-span-6 lg:col-span-3"
          }
        >
          <Label className="text-sm">Location</Label>
          <Input
            className="p-2 w-full border border-1 border-input-border rounded-lg cursor-pointer focus:border-blue-dark focus:outline-none focus:ring-0"
            name="location"
            placeholder="Location e.g. HA316AA"
            autoComplete="off"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLocation(e.target.value);
            }}
            value={location}
          />
        </Field>

        <Button
          className="col-span-12 md:col-start-7 lg:col-start-12 md:col-span-1 justify-self-center disabled:opacity-100 disabled:text-blue-500"
          variant="outline"
          size="icon"
          onClick={onSearch}
          disabled={btnDisabled}
        >
          <Search />
        </Button>
      </form>
    </div>
  );
}
