import { CiCirclePlus } from "react-icons/ci";
import "./styles.css";

interface PochaMenuPlusIconProps {
  size?: "medium" | "extra-large";
  className?: string;
}

export default function PlusIcon({
  size = "medium",
  className,
}: PochaMenuPlusIconProps) {
  return (
    <CiCirclePlus
      className={`${
        size === "extra-large" ? "extra_large_icon" : "icon"
      } ${className}`}
    />
  );
}
