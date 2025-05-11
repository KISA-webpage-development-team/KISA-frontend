"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";

import menu from "../../config/NavigationMenu";

export default function Menu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const handleDropdownClick = (idx) => {
    if (dropdownIndex === idx) {
      setShowDropdown(!showDropdown);
    } else {
      setShowDropdown(true);
      setDropdownIndex(idx);
    }
  };

  return (
    <div className="flex gap-5 last:lg:gap-8">
      {menu.map(({ name, dropdowns }, idx) => (
        <div className="relative text-sm lg:text-base" key={idx}>
          <button
            onMouseEnter={() => handleDropdownClick(idx)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <p className="cursor-pointer text-black hover:text-gray-600">
              {name}
            </p>

            {dropdowns && dropdownIndex === idx && showDropdown && (
              <div className="absolute w-48 top-full left-0 bg-white shadow-lg rounded-lg py-2 ">
                {dropdowns.map(({ name, href }) => (
                  <Link key={href} href={href}>
                    <p className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-left">
                      {name}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </button>
        </div>
      ))}
      {/* <Link key={"/contact"} href={"/contact"}>
        <p className="cursor-pointer text-black hover:text-gray-600">
          {"CONTACT"}
        </p>
      </Link> */}
    </div>
  );
}
