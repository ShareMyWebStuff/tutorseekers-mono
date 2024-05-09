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
      { title: "Search 1", link: "/search1" },
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

  console.log("source", source);

  console.log("menuChecked", menuChecked);

  // Disabled - if we are loading or saving data
  const disabled = source === "a";

  const normalMenuItem = (
    <PiCaretDown className="inline-block group-hover:rotate-180 mt-1" />
  );
  const menuItemOn = <PiCaretUp className="inline-block mt-1" />;
  const menuItemOff = <PiCaretDown className="inline-block mt-1" />;
  const underline =
    "py-1 md:pr-5 decoration-1 underline-offset-4 hover:underline";

  //
  // <ul className={`group-hover:md:block ${manualExpand && menuChecked[index] ? 'block' : 'hidden'} md:absolute static border-t-2 border-card-content-fg border-solid bg-card-content-bg text-card-content-fg rounded-lg p-3 z-1000`} >
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
                  className={`group-hover:md:block ${manualExpand && menuChecked[index] ? "block" : "hidden"} md:absolute static border-t-2 bg-gradient-to-r from-blue-dark from-0% via-blue-normal via-50% to-blue-dark to-100%  border-solid  rounded-lg p-3 z-1000`}
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

      {/* <li className={underline}>Home</li>

      <li className={"group  py-1 pr-5"}>

        <label htmlFor={`navbar-dropdown-${source}-0`}><span className="flex justify-between decoration-1 underline-offset-4 hover:underline">Search {!manualExpand && normalMenuItem} { manualExpand && menuChecked[0] && menuItemOn } { manualExpand && !menuChecked[0] && menuItemOff }</span></label>
        <input className="hidden" checked={menuChecked[0]} onChange={() => setMenuChecked ( (prev ) => { return {...prev, 0: !menuChecked[0]} } ) } disabled={disabled} type="checkbox" id={`navbar-dropdown-${source}-0`}/>

        <div className={"md:pt-2" + (manualExpand && menuChecked[0] ? " mt-2" : " md:mt-0") }>
          <ul className={`group-hover:md:block ${manualExpand && menuChecked[0] ? 'block' : 'hidden'} md:absolute static border-t-2 border-my-border border-solid bg-dropdown rounded-lg p-3`} >
            <li className={underline} onClick={() => { console.log ('Knowledge Centre')}} ><span>Search 1</span></li>
            <li className={underline} onClick={() => { console.log ('Q &amp; A')}} ><span>Search 2</span></li>
            <li className={underline} onClick={() => { console.log ('Search 3')}} ><span>Search 3</span></li>
          </ul>
        </div>

      </li>

      <li className="group py-1 pr-5">

        <label htmlFor={`navbar-dropdown-${source}-1`}><span className="flex justify-between">Students {!manualExpand && normalMenuItem} { manualExpand && menuChecked[1] && menuItemOn } { manualExpand && !menuChecked[1] && menuItemOff }</span></label>
        <input className="hidden" checked={menuChecked[1]} onChange={() => setMenuChecked ( (prev ) => { return {...prev, 1: !menuChecked[1]} } ) } disabled={disabled} type="checkbox" id={`navbar-dropdown-${source}-1`}/>

        <div className="md:pt-2">
          <ul className={`group-hover:md:block ${manualExpand && menuChecked[1] ? 'block' : 'hidden'} md:absolute static border-t-2 border-my-border border-solid bg-dropdown rounded-lg p-3`} >
            <li className={underline} onClick={() => { console.log ('Knowledge Centre')}} ><span>Students 1</span></li>
            <li className={underline} onClick={() => { console.log ('Q &amp; A')}} ><span>Students 2</span></li>
            <li className={underline} onClick={() => { console.log ('Search 3')}} ><span>Students 3</span></li>
          </ul>
        </div>

      </li>

      <li className="group py-1 pr-5">

        <label htmlFor={`navbar-dropdown-${source}-2`}><span className="flex justify-between">Tutors {!manualExpand && normalMenuItem} { manualExpand && menuChecked[2] && menuItemOn } { manualExpand && !menuChecked[2] && menuItemOff }</span></label>
        <input className="hidden" checked={menuChecked[2]} onChange={() => setMenuChecked ( (prev ) => { return {...prev, 2: !menuChecked[2]} } ) } disabled={disabled} type="checkbox" id={`navbar-dropdown-${source}-2`}/>

        <div className="md:pt-2">
          <ul className={`group-hover:md:block ${manualExpand && menuChecked[2] ? 'block' : 'hidden'} md:absolute static border-t-2 border-my-border border-solid bg-dropdown rounded-lg p-3`} >
            <li className={underline} onClick={() => { console.log ('Knowledge Centre')}} ><span>Tutors 1</span></li>
            <li className={underline} onClick={() => { console.log ('Q &amp; A')}} ><span>Tutors 2</span></li>
            <li className={underline} onClick={() => { console.log ('Search 3')}} ><span>Tutors 3</span></li>
          </ul>
        </div>

      </li> */}

      {/* Student - Dropdown */}
      {/* <li className="group py-1 pr-5">
        <label htmlFor="navbar-dropdown_2"><span>Student {normalMenuItem}</span></label>
        <input className="hidden" checked={menuChecked.searchMenu} onChange={() => setMenuChecked ( (prev ) => { return {...prev, searchMenu: !menuChecked.searchMenu }} ) } disabled={disabled} type="checkbox" id="navbar-dropdown_2"/>

        <div className="pt-2">
          <ul className="group-hover:block hidden absolute border-t-2 border-my-border border-solid bg-dropdown rounded-lg p-3" >
            <li className="py-1" onClick={() => { console.log ('Student 1')}} ><span>Knowledge Centre</span></li>
            <li className="py-1" onClick={() => { console.log ('Student 2')}} ><span>Q &amp; A</span></li>
            <li className="py-1" onClick={() => { console.log ('Student 3')}} ><span>Study Buddy</span></li>
          </ul>
        </div>

      </li> */}

      {/* Tutor - Dropdown */}
      {/* <li className="group py-1 pr-5">
        <label htmlFor="navbar-dropdown_3"><span>Tutor <PiCaretDown className="inline-block group-hover:rotate-180"/></span></label>
        <input className="hidden" checked={menuChecked.searchMenu} onChange={() => setMenuChecked ( (prev ) => { return {...prev, searchMenu: !menuChecked.searchMenu }} ) } disabled={disabled} type="checkbox" id="navbar-dropdown_3"/>

        <div className="pt-2">
          <ul className="group-hover:block hidden absolute border-t-2 border-my-border border-solid bg-dropdown rounded-lg p-3" >
            <li className="py-1" onClick={() => { console.log ('Tutor 1')}} ><span>Tutor 1</span></li>
            <li className="py-1" onClick={() => { console.log ('Tutor 2')}} ><span>Tutor 2</span></li>
            <li className="py-1" onClick={() => { console.log ('Tutor 3')}} ><span>Tutor 3</span></li>
          </ul>
        </div>

      </li> */}
    </ul>
  );
}

{
  /* <ChevronDownIcon
className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
aria-hidden="true"
/> */
}
