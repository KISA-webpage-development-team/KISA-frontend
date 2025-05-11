import React from "react";
import { ImReply } from "react-icons/im";

const ReplyIcon = ({ type = "normal", customClassName = "" }) => {
  return (
    <ImReply
      className={`${customClassName} w-3 h-3 md:w-5 md:h-5 text-gray-400 transform ${
        type === "flip" ? "scale-x-[-1]" : ""
      }`}
    />
  );
};

export default ReplyIcon;
