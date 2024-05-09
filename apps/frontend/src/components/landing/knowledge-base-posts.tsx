import Image from "next/image";
import BlogPostCard from "./blog-post-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function OurKnowledgeCenterBlogs() {
  const blogData = [
    {
      img: "/images/knowledge-center/math-1.jpg",
      alt: "Maths image",
      avatar: "/images/landing/about.png",
      avatarInitials: "DD",
      author: "Dirk Didler",
      publishedDate: "23/10/2019",
      keywords: ["Maths", "Algebra", "GCSE"],
      subject: "Maths",
      level: "GCSE",
      title: "Quadratic Equations",
      description:
        "There are 5 types of algebraic equations. Quadratic equations are one type. This is the forth blog in a sequence of 5 about quadratic equations. Quadratic equations can be defined as a polynomial equation of a second degree.",
    },
    {
      img: "/images/knowledge-center/languages-1.jpg",
      alt: "English Language image",
      avatar: "/images/landing/about.png",
      avatarInitials: "RD",
      author: "Roger Dee",
      publishedDate: "12/12/2023",
      keywords: ["English Language", "GCSE"],
      subject: "English Language",
      level: "GCSE",
      title: "Sentences",
      description:
        "Sentences are great stuff, it allows you write something very direct and descriptive.",
    },
    {
      img: "/images/knowledge-center/physics-1.jpg",
      alt: "Physics image",
      avatar: "/images/landing/about.png",
      avatarInitials: "DD",
      author: "Mohammed Iqbal",
      publishedDate: "23/10/2018",
      keywords: ["Physics", "Algebra", "GCSE"],
      subject: "Physics",
      level: "GCSE",
      title: "Explosions",
      description:
        "There are three types of explosions, small, medium and awesome. The awesome explosions are brilliant as they are noisy and often destroy everything around them.",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-light from-0% via-white-900 via-50% to-blue-light to-90% pt-8 text-black">
      <div className="max-w-7xl w-11/12 m-auto py-12">
        <h2 className="text-2xl text-center mb-12">
          Latest Knowledge Center Blogs
        </h2>

        <p className="mb-6">
          Here at Tutorseekers we want to help students expand their knowledge
          of the subjects by creating a set of study guides. These study guides
          are totally free and are there to help you. ...
        </p>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-8"
          data-cy="landingOurSubjectsSectionItems"
        >
          {blogData.map((blog, idx) => {
            let className =
              idx >= 2 ? "hidden lg:block" : idx >= 1 ? "hidden sm:block" : "";
            return (
              <BlogPostCard
                className={className}
                key={idx}
                img={blog.img}
                alt={blog.alt}
                avatar={blog.avatar}
                avatarInitials={blog.avatarInitials}
                author={blog.author}
                publishedDate={blog.publishedDate}
                keywords={blog.keywords}
                title={blog.title}
                description={blog.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
