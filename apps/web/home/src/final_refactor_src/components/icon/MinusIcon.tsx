import { FaMinus } from "react-icons/fa";
import "./styles.css";

interface MinusIconProps {
  size?: "extra-small" | "small" | "medium";
  className?: string;
}

export default function MinusIcon({
  size = "medium",
  className,
}: MinusIconProps) {
  return (
    <FaMinus
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
