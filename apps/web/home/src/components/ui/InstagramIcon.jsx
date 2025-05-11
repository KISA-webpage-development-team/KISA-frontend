import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";

export default function InstagramIcon({ color = "none" }) {
  if (color === "black") {
    return <AiOutlineInstagram className={`text-2xl md:text-3xl text-black`} />;
  }

  return (
    <AiOutlineInstagram
      className="text-3xl rounded-lg
text-white bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300
    p-[0.15rem]"
    />
  );
}
