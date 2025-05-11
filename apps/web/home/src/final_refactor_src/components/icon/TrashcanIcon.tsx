import { MdDelete } from "react-icons/md";
import React from "react";

type TrashcanIconProps = {
  color?: "white" | "gray";
  noResize?: boolean;
};

export default function TrashcanIcon({
  color = "white",
  noResize = false,
}: TrashcanIconProps) {
  return (
    <MdDelete
      className={`${noResize ? "text-base" : "icon"}
    ${color === "gray" ? "text-gray-400" : "text-michigan-maize"}`}
    />
  );
}
