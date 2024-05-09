import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

interface BlogPostCardProps {
  className?: string;
  img: string;
  alt: string;
  avatar: string | undefined;
  avatarInitials: string;
  author: string;
  publishedDate: string;
  keywords: string[];
  title: string;
  description: string;
}

export default function BlogPostCard(props: BlogPostCardProps) {
  return (
    <div
      className={
        `block bg-white shadow-secondary-1 dark:bg-surface-dark text-white-700 group ` +
        (props.className && props.className)
      }
    >
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat rounded-t-xl"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        <Image
          src={props.img}
          alt={props.alt}
          width={400}
          height={265}
          quality={75}
          className="w-full transition duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="p-6 text-surface bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-25% to-blue-dark to-90% pt-8 text-white-800 rounded-b-xl">
        <div className="pb-1">
          {props.keywords.map((keyword, idx) => {
            return (
              <span
                key={idx.toString()}
                className="inline bg-gray-300 py-1 px-2 mr-2 rounded-full text-xs lowercase text-gray-700"
              >
                {keyword}
              </span>
            );
          })}
        </div>

        <h5 className="my-2 text-xl font-medium leading-tight">
          {props.title}
        </h5>
        <p className="mb-4 text-base h-36 overflow-hidden">
          {props.description}
        </p>

        <div className="mt-2 flex flex-row justify-between">
          <div className="flex flex-row">
            <Avatar className="">
              <AvatarImage src={props.avatar} alt="Authors avatar" />
              <AvatarFallback>{props.avatarInitials}</AvatarFallback>
            </Avatar>

            <div className="text-sm ml-2">
              <p>{props.author}</p>
              <p>{props.publishedDate}</p>
            </div>
          </div>
          <Button className="content-end">View Blog</Button>
        </div>
      </div>
    </div>
  );
}
