import React from "react";
import LoginButton from "../Header/LoginButton";

export default function NotLoginModal() {
  return (
    <div
      className="md:text-lg 
    w-full h-full flex flex-col items-center "
    >
      <p className="mb-2">로그인이 필요합니다!</p>
      <LoginButton />
    </div>
  );
}
