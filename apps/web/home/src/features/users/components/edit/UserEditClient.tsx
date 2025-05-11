"use client";

// UserEditClient: client wrapper component for user edit page
// includes fixed fields (e.g., email) and editable fields (e.g., major, gradYear, linkedIn)

// [NOTE on Abstraction]
// 원래는 Editable Field와 Fixed Field를 Abstraction으로 나누어서 쉽게 수정할 수 있도록 노력했지만,
// 실패했다.
// 이유는 Editable Field와 Fixed Field가 서로 다른 부분이 많아서, Abstraction으로 나누는 것이
// 오히려 코드를 복잡하게 만들었기 때문.

import React from "react";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";

// hooks
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/apis/users/swrHooks";

// sub-ui components
import UserEditForm from "./UserEditForm";
import UserEditFixed from "./UserEditFixed";
import { LoadingSpinner } from "@/final_refactor_src/components/feedback";

// types
import { UserSession } from "@/lib/next-auth/types";

type UserEditClientProps = {
  email: string;
  session: UserSession | null;
};

export default function UserEditClient({
  email,
  session,
}: UserEditClientProps) {
  // fetch user data
  const { user, isLoading, error } = useUser(email, session.token);

  // Form States ---------------------------------------------------------------
  // loading state for filling initial fields
  const [initialFieldsFilled, setInitialFieldsFilled] = useState(false);

  // form editable fields
  const [major, setMajor] = useState<string>("");
  const [gradYear, setGradYear] = useState<number>(0);
  const [linkedIn, setLinkedIn] = useState<string>(""); // optional
  // Form functionality --------------------------------------------------------
  // set initial fields when user data is fetched
  useEffect(() => {
    if (isLoading || !user) return;
    setInitialFieldsFilled(true);

    setMajor(user.major);
    setGradYear(user.gradYear);
    setLinkedIn(user.linkedin ? user.linkedin : ""); // optional

    setInitialFieldsFilled(true);
  }, [isLoading, user]);

  // memoized callbacks to reduce re-renders
  const setMajorCallback = useCallback((value: string) => setMajor(value), []);
  const setGradYearCallback = useCallback(
    (value: number) => setGradYear(value),
    []
  );
  const setLinkedInCallback = useCallback(
    (value: string) => setLinkedIn(value),
    []
  );

  // if loading or initial fields are not filled, show loading spinner
  if (isLoading || !initialFieldsFilled) return <LoadingSpinner />;

  // if error occurs, throw error to be handled by error boundary
  if (error) {
    throw error;
  }

  return (
    <div
      className={`${sejongHospitalLight.className}
      self-stretch w-full mx-auto
      flex flex-col justify-center md:flex-row gap-8 md:gap-16 lg:gap-20`}
    >
      {/* FIXED: email */}
      <UserEditFixed
        profile={session.user.image}
        fullname={user.fullname}
        email={user.email}
      />
      {/* EDITABLE: major, gradYear, linkedIn */}
      <UserEditForm
        major={major}
        setMajor={setMajorCallback}
        gradYear={gradYear}
        setGradYear={setGradYearCallback}
        linkedIn={linkedIn}
        setLinkedIn={setLinkedInCallback}
        email={email}
        token={session.token}
      />
    </div>
  );
}
