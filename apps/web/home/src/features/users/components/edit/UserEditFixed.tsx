import { EmailIcon } from "@/final_refactor_src/components/icon";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import Image from "next/image";
import React, { memo } from "react";

type UserEditFixedProps = {
  profile: string;
  fullname: string;
  email: string;
};

const UserEditFixed = ({ profile, fullname, email }: UserEditFixedProps) => {
  return (
    <div
      className={`flex flex-col items-center 
    gap-2 md:gap-4`}
    >
      {/* Image */}
      {profile && (
        <figure
          className="relative flex justify-center 
    aspect-square w-16 md:w-20"
        >
          {/* LCP */}
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

      {/* fullname + email */}
      <div className="flex flex-col items-center">
        {/* [NOTE] User's name is treated as the main text (heading) of the page */}
        <h1 className={`${sejongHospitalBold.className} text-xl md:text-2xl`}>
          {fullname}
        </h1>
        {/* email */}
        <div className="flex flex-row gap-2 items-center">
          <EmailIcon />
          <span className="text-sm md:text-lg">{email}</span>
        </div>
      </div>
    </div>
  );
};

// memo() is applied to prevent re-rendering of the Fixed Component
export default memo(UserEditFixed);
