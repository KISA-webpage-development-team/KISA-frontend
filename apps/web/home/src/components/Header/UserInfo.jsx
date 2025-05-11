import Image from "next/image";
import Link from "next/link";
import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function UserInfo({ email, image, name }) {
  // user page is navigated by using email's first part

  return (
    <Link href={`/users/${email}`} className="flex items-center">
      <div className="relative flex w-8 h-8">
        <Image
          className="rounded-full"
          src={image}
          sizes={100}
          fill
          alt="user profile"
        />
      </div>
      <p
        className={`${sejongHospitalBold.className}
      hidden lg:block text-lg ml-3 mr-3 
      text-white hover:text-michigan-maize`}
      >
        {name}
      </p>
    </Link>
  );
}
