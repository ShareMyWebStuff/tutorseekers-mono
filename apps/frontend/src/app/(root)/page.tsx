"use client";

import { useState } from "react";
// import CategoryFilter from '@/components/shared/CategoryFilter';
// import Collection from '@/components/shared/Collection'
// import Search from '@/components/shared/Search';
import { Button } from "@/components/ui/button";
// import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TutorSelector } from "@/components/landing/tutor-selector";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { OurService } from "@/components/landing/our-services";
import { OurSubjects } from "@/components/landing/our-subjects";
import { OurKnowledgeCenterBlogs } from "@/components/landing/knowledge-base-posts";
import { HowItWorks } from "@/components/landing/how-it-works";

export default function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const [score, setScore] = useState(0);
  const increaseScore = () => setScore(score + 1);

  //   const events = await getAllEvents({
  //     query: searchText,
  //     category,
  //     page,
  //     limit: 6
  //   })

  return (
    <>
      <TutorSelector />

      <HowItWorks />

      <OurSubjects />

      <OurService />

      <OurKnowledgeCenterBlogs />
    </>
  );
}
