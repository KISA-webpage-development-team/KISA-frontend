import { CiCircleMinus } from "react-icons/ci";
import "./styles.css";

interface PochaMenuMinusIconProps {
  size?: "medium" | "extra-large";
  className?: string;
}

export default function PlusIcon({
  size = "medium",
  className,
}: PochaMenuMinusIconProps) {
  return (
    <CiCircleMinus
      className={`${
        size === "extra-large" ? "extra_large_icon" : "icon"
      } ${className}`}
    />
  );
}
