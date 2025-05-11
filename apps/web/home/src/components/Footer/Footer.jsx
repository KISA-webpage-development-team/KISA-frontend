"use client";

import React from "react";
import InstagramLinkIcon from "../shared/InstagramLinkIcon";
import FacebookLinkIcon from "../shared/FacebookLinkIcon";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

// instagram + facebook icons
// umich kisa text

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/pocha")) {
    return null;
  }

  return (
    <div
      className={`${sejongHospitalLight.className} 
      flex flex-col gap-0 md:gap-2 justify-center items-center
      mt-6 py-[30px]`}
    >
      <div className="flex items-center gap-2">
        <InstagramLinkIcon color="black" />
        <FacebookLinkIcon color="black" />
      </div>

      <Link href="/" className="text-md sm:text-lg md:text-xl">
        UMICH KISA
      </Link>
    </div>
  );
}
