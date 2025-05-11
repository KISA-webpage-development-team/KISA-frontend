"use client";

import { signIn, signOut } from "next-auth/react";
import React from "react";
import { heebo } from "@/utils/fonts/textFonts";
import CustomButton from "@/final_refactor_src/components/button/CustomButton";
export default function LoginButton({ session = false, size = "md" }) {
  const buttonStyle = "bg-white text-black shadow-lg font-bold";

  return session ? (
    <CustomButton
      className={`${buttonStyle} ${heebo.className}`}
      type="secondary"
      onClick={() => signOut()}
      size={size}
      text="로그아웃"
    />
  ) : (
    <CustomButton
      className={`${buttonStyle} ${heebo.className}`}
      type="secondary"
      onClick={() => signIn("google")}
      size={size}
      text="로그인"
    />
  );
}
