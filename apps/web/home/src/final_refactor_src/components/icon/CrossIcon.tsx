import { RxCross2 } from "react-icons/rx";
import "./styles.css";

interface CrossIconProps {
  size?: "extra-small" | "small" | "medium";
  className?: string;
}

export default function CrossIcon({
  size = "medium",
  className,
}: CrossIconProps) {
  return (
    <RxCross2
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
