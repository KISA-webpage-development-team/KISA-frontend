import { FaPlus } from "react-icons/fa";
import "./styles.css";

interface PlusIconProps {
  size?: "extra-small" | "small" | "medium";
  className?: string;
}

export default function PlusIcon({
  size = "medium",
  className,
}: PlusIconProps) {
  return (
    <FaPlus
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
