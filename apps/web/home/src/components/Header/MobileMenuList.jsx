import React, { useState } from "react";
import menu from "../../config/NavigationMenu";
import Link from "next/link";

import DownIcon from "../ui/DownIcon";
import UpIcon from "../ui/UpIcon";

import styles from "./header.module.css";

export default function MobileMenuList() {
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
  const accordionContentStyles = showDropdown
    ? "max-h-[1000px] transition-max-height duration-300 ease"
    : "max-h-0 overflow-hidden transition-max-height duration-300 ease";

  return (
    <div className="flex flex-col items-start gap-8 w-full">
      {menu.map(({ name, dropdowns }, idx) => (
        <div
          className="relative text-sm w-full outline-none focus:outline-none"
          key={idx}
        >
          <div
            // onMouseEnter={() => handleDropdownClick(idx)}
            // onMouseLeave={() => setShowDropdown(false)}
            onClick={() => handleDropdownClick(idx)}
            className="relative w-full outline-none focus:outline-none"
          >
            <div className="w-full flex items-center justify-between">
              <p
                className={`text-left cursor-pointer hover:text-michigan-maize
              ${
                showDropdown && dropdownIndex === idx
                  ? "text-michigan-maize"
                  : "text-white"
              }`}
              >
                {name}
              </p>
              {showDropdown && dropdownIndex === idx ? (
                <UpIcon />
              ) : (
                <DownIcon />
              )}
            </div>

            {dropdowns && dropdownIndex === idx && showDropdown && (
              <div
                className={`w-48 top-full left-0 py-2 bg-inherit ${accordionContentStyles}`}
              >
                {dropdowns.map(({ name, href }) => (
                  <Link key={href} href={href}>
                    <p
                      className={`cursor-pointer text-white hover:text-michigan-maize px-3 py-2 text-left`}
                    >
                      {name}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
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
