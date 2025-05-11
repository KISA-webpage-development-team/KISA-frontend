// 이걸 entity로 옮겨야할 것 같긴함.

// [ui]
// - user profile image
// - name
// - major
import React from "react";
import Image from "next/image";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

type UserProfileInfoProps = {
  fullname: string;
  major: string;
  hasProfile: boolean;
  profile?: string;
};

export default function UserProfileInfo({
  fullname,
  major,
  hasProfile,
  profile,
}: UserProfileInfoProps) {
  return (
    <div
      className="flex flex-row md:flex-col 
      justify-center items-center 
    gap-2 md:gap-4 "
      // aria-label="User Profile Information"
    >
      {/* Profile Image */}
      {hasProfile && (
        <figure
          className="relative flex
         w-16 md:w-20 aspect-square "
        >
          {/* [NOTE] Profile image is loaded as LCP (Large Content). Let's add priority */}
          <Image
            priority
            className="rounded-full object-contain"
            src={profile}
            alt="profile image"
            fill
            sizes="100%"
          />
        </figure>
      )}

      {/* fullname + major */}
      <div
        className="flex flex-col items-center
       gap-0"
      >
        {/* [NOTE] User's name is treated as the main text (heading) of the page */}
        <h1 className={`${sejongHospitalBold.className} text-xl md:text-2xl`}>
          {fullname}
        </h1>
        <span className="text-sm md:text-lg">{major}</span>
      </div>
    </div>
  );
}
