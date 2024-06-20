"use client";

import { useState } from "react";
import Link from "next/link";
import { PiCaretUp } from "react-icons/pi";
import { PiCaretDown } from "react-icons/pi";

type Menus = {
  [key: string]: boolean;
};

interface HeaderNavProps {
  source: string;
  manualExpand: boolean;
}

const menuItems = [
  { title: "Home", link: "/" },
  {
    title: "Search",
    subMenu: [
      { title: "Woo", link: "/woo" },
      { title: "Search 2", link: "/search2" },
      { title: "Search 3", link: "/search3" },
    ],
  },
  {
    title: "Students",
    subMenu: [
      { title: "Student 1", link: "/student1" },
      { title: "Student 2", link: "/student2" },
      { title: "Student 3", link: "/student3" },
    ],
  },
];

export function HeaderNav({ source, manualExpand }: HeaderNavProps) {
  const [menuChecked, setMenuChecked] = useState<Menus>(
    Object.fromEntries(menuItems.map((item, index) => [index, false])),
  );

  // Disabled - if we are loading or saving data
  const disabled = source === "a";

  const normalMenuItem = (
    <PiCaretDown className="inline-block group-hover:rotate-180 mt-1" />
  );
  const menuItemOn = <PiCaretUp className="inline-block mt-1" />;
  const menuItemOff = <PiCaretDown className="inline-block mt-1" />;
  const underline =
    "py-1 md:pr-5 decoration-1 underline-offset-4 hover:underline";

  return (
    <ul className="flex md:flex-row flex-col list-none z-1000">
      {menuItems.map((item, index) => {
        if (item.subMenu) {
          return (
            <li key={index} className={"group py-1 pr-5"}>
              <label htmlFor={`navbar-dropdown-${source}-${index}`}>
                <span className="flex justify-between decoration-1 underline-offset-4 hover:underline">
                  {item.title} {!manualExpand && normalMenuItem}{" "}
                  {manualExpand && menuChecked[index] && menuItemOn}{" "}
                  {manualExpand && !menuChecked[index] && menuItemOff}
                </span>
              </label>
              <input
                className="hidden"
                checked={menuChecked[index]}
                onChange={() =>
                  setMenuChecked((prev) => {
                    return { ...prev, [index]: !menuChecked[index] };
                  })
                }
                disabled={disabled}
                type="checkbox"
                id={`navbar-dropdown-${source}-${index}`}
              />

              <div
                className={
                  "md:pt-2" +
                  (manualExpand && menuChecked[index] ? " mt-2" : " md:mt-0")
                }
              >
                <ul
                  className={`group-hover:md:block ${manualExpand && menuChecked[index] ? "block" : "hidden"} md:absolute static bg-white-800 text-blue-dark  border-solid rounded-lg p-3 z-1000`}
                >
                  {item.subMenu.map((subItem, subIndex) => {
                    return (
                      <li key={index + "-" + subIndex} className={underline}>
                        <Link className=" cursor-default" href={subItem.link}>
                          {subItem.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        }

        return (
          <li key={index} className={underline}>
            <Link className="text-white-800 cursor-default" href={item.link}>
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
