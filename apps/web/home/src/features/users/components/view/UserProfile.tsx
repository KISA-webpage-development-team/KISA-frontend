"use client";

// [UI]
// UserProfileInfo: image (only for the self), name, major
// UserProfileDetails: email, gradYear, linkedIn
// EditButton: edit button (only for the self)

// [Logic]
// isSelf: check if the user is the same as the logged-in user
// useUser: fetch user data based on the email
// prepareDetailList: prepare detail list for the user (UserProfileDetails)

import React from "react";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
// api
import { useUser } from "@/apis/users/swrHooks";

// sub-ui components
import UserProfileInfo from "./UserProfileInfo";
import UserProfileDetails from "./UserProfileDetails";
import {
  LoadingSpinner,
  NotFound,
} from "@/final_refactor_src/components/feedback";
import CustomLinkButton from "@/final_refactor_src/components/button/CustomLinkButton";
import {
  EmailIcon,
  GradIcon,
  LinkedInIcon,
} from "@/final_refactor_src/components/icon";

// Types
import { UserSession } from "@/lib/next-auth/types";
import { User } from "@/types/user";

type UserProfileProps = {
  email: string;
  session: UserSession | null;
};

export default function UserProfile({ email, session }: UserProfileProps) {
  // [Logic]: Fetch user data based on the email
  const { user, isLoading, error } = useUser(email, session.token);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    // Error handling while fetching user data
    return <NotFound />;
  }

  // [Logic]: Prepare detail list for the returned user
  const prepareDetailList = (user: User) => {
    const { email, gradYear, linkedin } = user;
    return [
      {
        icon: <EmailIcon />,
        text: email,
      },
      {
        icon: <GradIcon />,
        text: "Class of " + gradYear.toString(),
      },
      {
        icon: <LinkedInIcon />,
        text: linkedin?.split(".com/in/")[1]?.replace("/", ""),
        onClick: () => window.open(linkedin, "_blank"),
      },
    ];
  };

  const detailList = prepareDetailList(user);

  // [Logic]: Check if the user is the same as the logged-in user
  // if so, the user can edit their profile
  const isSelf = session.user.email === email;

  return (
    <div
      className={`flex flex-col md:flex-row
     ${sejongHospitalLight.className}
     gap-4 md:gap-10 lg:gap-12 justify-center items-center`}
    >
      {/* Left: Profile Image (if email is same as logged in user) + Name + Major*/}
      <UserProfileInfo
        fullname={user.fullname}
        major={user.major}
        hasProfile={isSelf}
        profile={session.user.image}
      />
      {/* Right: Details (email + gradYear + linkedIn) + Edit Button */}
      <div className="flex flex-col gap-4 w-fit">
        <UserProfileDetails detailList={detailList} />
        {isSelf && (
          <CustomLinkButton
            type="primary"
            href={`/users/edit/${email}`}
            text="정보 수정"
          />
        )}
      </div>
    </div>
  );
}
