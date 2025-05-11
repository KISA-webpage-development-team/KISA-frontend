"use client";

import { Button } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { heebo, sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function LoginButton({ session = false, size = "md" }) {
  const buttonStyle = "bg-white text-black shadow-lg font-bold";

  return session ? (
    <Button
      className={`${buttonStyle} ${heebo.className}`}
      onClick={() => signOut()}
      size={size}
    >
      로그아웃
    </Button>
  ) : (
    <Button
      className={`${buttonStyle} ${heebo.className}`}
      onClick={() => signIn("google")}
      size={size}
    >
      로그인
    </Button>
  );
}
