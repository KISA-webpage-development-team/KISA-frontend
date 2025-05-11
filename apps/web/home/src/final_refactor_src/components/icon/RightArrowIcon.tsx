import { FaChevronRight } from "react-icons/fa";
import "./styles.css";

interface RightArrowIconProps {
  size?: "extra-small" | "small" | "medium";
  className?: string;
}

export default function RightArrowIcon({
  size = "medium",
  className,
}: RightArrowIconProps) {
  return (
    <FaChevronRight
      className={`${
        size === "extra-small"
          ? "extra_small_icon"
          : size === "small"
          ? "small_icon"
          : "icon"
      } ${className}`}
    />
  );
}
