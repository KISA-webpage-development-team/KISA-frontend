/**
 * MenuListItem
 * - Displays a menu item card
 */

import { MenuItem } from "@/types/pocha";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import React from "react";
import { getMenuImagePath } from "@/features/pocha/utils/getImagePath";
import Image from "next/image";

interface MenuItemCardProps {
  menu: MenuItem;
  underAge: boolean;
  setSelectedMenu: (menu: MenuItem) => void;
  isPriority?: boolean;
}

/**
 * Renders the age restriction overlay for underage users (drinks)
 */
const AGE_RESTRICTION_MESSAGE = "Only for 21+";

function AgeRestrictionOverlay() {
  return (
    <div
      className="absolute z-20 rounded-lg bg-slate-500/50 w-full h-full 
      flex justify-center items-center"
    >
      <span className={`text-lg text-red-600 ${sejongHospitalBold.className}`}>
        {AGE_RESTRICTION_MESSAGE}
      </span>
    </div>
  );
}

export default function MenuListItem({
  menu,
  underAge,
  setSelectedMenu,
  isPriority = false,
}: MenuItemCardProps) {
  const { menuID, nameEng, nameKor, price, ageCheckRequired, stock } = menu;
  const notForUnderAge = ageCheckRequired && underAge;

  const handleMenuClick = () => {
    setSelectedMenu(menu);
  };

  return (
    <li key={`menu-${menuID}`} className="relative w-full">
      {notForUnderAge ? <AgeRestrictionOverlay /> : <></>}

      <button
        className="w-full flex flex-row items-center gap-4 py-4
        transition-all duration-300 hover:bg-gray-100"
        onClick={handleMenuClick}
        disabled={notForUnderAge || stock === 0}
      >
        {/* Menu Item Image */}
        <figure className="relative h-[6rem] w-[6rem] items-center flex-shrink-0">
          <Image
            src={getMenuImagePath(menuID)}
            alt={nameEng}
            priority={isPriority}
            fill
            sizes="(max-width: 768px) 20vw"
            className="rounded-[15px] border-gray-300 shadow-md object-cover"
          />
        </figure>

        {/* Menu Info */}
        <div
          className="flex flex-col items-start justify-center 
        text-left text-lg leading-[150%] text-overflow"
        >
          <span
            className={`${sejongHospitalBold.className} 
          ${stock === 0 ? "text-gray-500 line-through" : "text-black"}`}
          >
            {nameKor} {nameEng}
          </span>
          <span
            className={`${sejongHospitalBold.className} mt-2
            ${stock === 0 ? "text-red-500" : "text-gray-500"}`}
          >
            {stock === 0 ? "Out of Stock" : `$${price}`}
          </span>
        </div>
      </button>
    </li>
  );
}
