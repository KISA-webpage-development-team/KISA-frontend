import React from "react";
import LoginButton from "./LoginButton";
import UserInfo from "./UserInfo";
import MobileMenuList from "./MobileMenuList";
import MobileMenuCloseButton from "./MobileMenuCloseButton";

export default function MobileMenu({
  session,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  return (
    <div
      className="z-20 w-full flex flex-col gap-12 items-start pb-12 pt-6 px-12
    bg-michigan-blue"
    >
      {/* 1. User + Login Button */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          {session && (
            <UserInfo
              email={session.user.email}
              image={session.user.image}
              name={session.user.name}
            />
          )}

          <LoginButton session={session} />
        </div>

        <MobileMenuCloseButton
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>

      <MobileMenuList />
    </div>
  );
}
