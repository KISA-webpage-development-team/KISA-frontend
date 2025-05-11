import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import "./styles.css";

type LikeIconProps = {
  size: "small" | "medium";
  fill?: boolean;
  isGray?: boolean;
  color?: "blue" | "maize";
  className?: string;
};

// This LikeIcon is kind of special one for 개추 버튼
export default function LikeIcon({
  size,
  fill = false,
  isGray = false,
  color = "blue",
  className = "",
}: LikeIconProps) {
  // this is used on like

  const textColor =
    color === "blue" ? "text-michigan-blue" : "text-michigan-maize";

  if (fill) {
    return (
      <AiFillLike
        className={`${className} ${size === "small" ? "small_icon" : "icon"} 
      ${!isGray && textColor}`}
      />
    );
  }

  return (
    <AiOutlineLike
      className={`${className} ${size === "small" ? "small_icon" : "icon"} 
      ${!isGray && textColor}`}
    />
  );
}
