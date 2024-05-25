"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select } from "@headlessui/react";
import { Field, Input, Label } from "@headlessui/react";
import { Check } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { tuitionCategories, tuitionSubjects } from "@/constants/subjects";
import { GoTriangleRight } from "react-icons/go";

type OptionsType = {
  key: string;
  value: string;
};

//
// Interface for the useState formData
//
interface IFormData {
  catOptions: OptionsType[];

  subjectList: {
    [key: number]: {
      categoryId: string;
      category: string;
      area: string;
      subArea?: string | undefined;
      subjects: { subjectId: number; subject: string }[];
    };
  };
}

const FormSchema = z.object({
  subjectCategories: z.string(),
  subjectSearch: z.string().max(50),
});

export function ListSubjectsForm() {
  /**
   * Sets the default category from the url path
   * @param cat
   * @returns
   */
  const setCategoryFromPath = (cat: string | null) => {
    if (cat !== null) {
      for (const key in tuitionCategories) {
        if (cat === tuitionCategories[key].category) {
          return cat;
        }
      }
    }
    return "All";
  };

  // Retrieve the pathname and search parameters
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const [subjectCategory, setSubjectCategory] = useState(() =>
    setCategoryFromPath(searchParams.get("category")),
  ); // useState('Academicfde'); // ( (router.query['category'] ? router.query['category']: 'All' ) as string );
  const [subjectSearch, setSubjectSearch] = useState("");
  const [formData, setFormData] = useState<IFormData>({
    catOptions: [],
    subjectList: {},
  });

  console.log("subjectCategory");
  console.log(subjectCategory);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subjectCategories: "",
      subjectSearch: "",
    },
  });

  // Convert the categories and subjects structures into meaningful objects for listing the subjects
  useEffect(() => {
    //
    // Creates a list of the categories
    // e.g. [ {key: 1, value: 'Academic'}, {key: 31, value: 'IT'}, {key: 28, value: 'Lifestyle'}, {key: 26}]
    //
    const createCategoryList = () => {
      const catList: OptionsType[] = [];
      let lastCat = "";
      for (const key in tuitionCategories) {
        if (lastCat !== tuitionCategories[key].category) {
          catList.push({ key: key, value: tuitionCategories[key].category });

          lastCat = tuitionCategories[key].category;
        }
      }
      return catList;
    };

    //
    // Creates a list of subject
    //
    const createSubjectList = () => {
      const catSubs: {
        [key: number]: {
          categoryId: string;
          category: string;
          area: string;
          subArea?: string;
          subjects: { subjectId: number; subject: string }[];
        };
      } = {};

      for (let eachCat in tuitionCategories) {
        catSubs[eachCat] = {
          categoryId: eachCat,
          category: tuitionCategories[eachCat].category,
          area: tuitionCategories[eachCat].area,
          subArea: tuitionCategories[eachCat].subArea
            ? tuitionCategories[eachCat].subArea
            : "",
          subjects: [],
        };
      }

      for (let eachSub in tuitionSubjects) {
        tuitionSubjects[eachSub].categories.forEach((catDet) => {
          catSubs[catDet.subjectCategoryId].subjects.push({
            subjectId: tuitionSubjects[eachSub].subjectId,
            subject: tuitionSubjects[eachSub].subject,
          });
        });
      }

      return catSubs;
    };

    const allOption: OptionsType = { key: "0", value: "All" };
    const catOptions = [allOption, ...createCategoryList()];
    const subjectList = createSubjectList();

    setFormData((prev) => ({ ...prev, catOptions, subjectList }));
  }, []);

  /**
   * Creates all the category boxes with the subjects.
   *
   * @param subjectList
   * @param subjectCategoryId
   * @param subjectSearch
   * @returns
   */
  const displayArticles = (
    subjectList: {
      [key: number]: {
        categoryId: string;
        category: string;
        area: string;
        subArea?: string | undefined;
        subjects: { subjectId: number; subject: string }[];
      };
    },
    subjectCategory: string,
    subjectSearch: string,
  ) => {
    const subDisplay = [];

    const search = subjectSearch.toUpperCase();
    for (let eachCat in subjectList) {
      if (
        subjectCategory === "All" ||
        subjectCategory === subjectList[eachCat].category
      ) {
        const filteredSubs = subjectList[eachCat].subjects.filter((sub) => {
          if (
            subjectSearch === "" ||
            sub.subject.toUpperCase().includes(search)
          ) {
            return sub.subject;
          }
        });

        if (filteredSubs.length > 0) {
          subDisplay.push(
            <article key={subjectList[eachCat].categoryId}>
              <p className="bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% text-white-800 p-2 rounded-xl inline-block my-4  w-full">
                {subjectList[eachCat].category}{" "}
                <GoTriangleRight className="inline-block" />{" "}
                {subjectList[eachCat].area}
                {subjectList[eachCat].subArea ? (
                  <>
                    <GoTriangleRight className="inline-block" />{" "}
                    {subjectList[eachCat].subArea}{" "}
                  </>
                ) : null}
              </p>
              <div className="bg-white-900 rounded-xl p-2 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pl-4 mb-6">
                {filteredSubs.map((sub, idx) => {
                  return <span key={idx}>{sub.subject}</span>;
                })}
              </div>
            </article>,
          );
        }
      }
    }

    return subDisplay;
  };

  // Make the input field controlled
  const onSelectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubjectCategory(e.target.value);
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectSearch(e.target.value);
  };

  return (
    <div className="py-12">
      <Card className="w-full mb-6">
        <CardHeader className="bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% text-white-800 rounded-t-xl">
          <CardTitle className="text-white-900 text-2xl text-center">
            Subjects
          </CardTitle>

          <form className="flex sm:flex-row flex-col gap-4 ">
            <Field className="col-span-12 md:col-span-5 lg:col-span-3">
              <Label className="text-sm">Subject Category</Label>
              <Select
                className="w-full p-2 rounded-lg text-blue-dark "
                name="status"
                aria-label="Subject category"
                onChange={onSelectChangeHandler}
                value={subjectCategory}
              >
                {formData.catOptions.map((cat, idx) => {
                  return (
                    <option key={idx} value={cat.value}>
                      {cat.value}
                    </option>
                  );
                })}
              </Select>
            </Field>

            <Field className={"col-span-12 md:col-span-7 lg:col-span-4"}>
              <Label className="text-sm">Subject</Label>
              <Input
                className="p-2 rounded-lg w-full text-blue-dark"
                name="subject"
                placeholder="Enter subject"
                onChange={onInputChangeHandler}
                autoComplete="off"
              />
            </Field>
          </form>
        </CardHeader>

        <CardContent className="bg-blue-light px-1 p-6">
          {displayArticles(
            formData.subjectList,
            subjectCategory,
            subjectSearch,
          )}
        </CardContent>

        <CardFooter className="bg-blue-light rounded-b-xl py-4"></CardFooter>
      </Card>
    </div>
  );
}
