import React from "react";
import { FaFacebook } from "react-icons/fa";

export default function FacebookIcon({ color = "none" }) {
  if (color === "black") {
    return <FaFacebook className={`w-5 h-5 md:w-6 md:h-6 text-black`} />;
  }

  return <FaFacebook className="text-3xl text-blue-500" />;
}
