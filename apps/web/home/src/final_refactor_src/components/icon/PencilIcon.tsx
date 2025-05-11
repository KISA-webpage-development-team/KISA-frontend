import { BiPencil } from "react-icons/bi";
import React from "react";

type PencilIconProps = {
  color?: "white" | "gray";
  noResize?: boolean;
};

export default function PencilIcon({
  color = "white",
  noResize = false,
}: PencilIconProps) {
  return (
    <BiPencil
      className={`${noResize ? "text-base" : "icon"}
        ${color === "gray" ? "text-gray-400" : "text-michigan-maize"}`}
    />
  );
}
