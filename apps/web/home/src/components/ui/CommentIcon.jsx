import { FaRegComments } from "react-icons/fa";

export default function CommentIcon({ color = "black", noResize = false }) {
  return (
    <FaRegComments
      className={`${noResize ? "text-base" : "w-3 h-3 md:w-5 md:h-5"}
  ${color === "gray" ? "text-gray-400" : "text-black"}`}
    />
  );
}

export function UserPageCommentIcon({ size = "small" }) {
  return (
    <FaRegComments
      className={`${
        size === "medium" ? "text-lg md:text-2xl" : "w-4 h-4"
      } text-gray-800`}
    />
  );
}
