import { IoTicketSharp } from "react-icons/io5";
import "./styles.css";

interface TicketIconProps {
  size?: "extra-small" | "small" | "medium" | "large" | "extra-large";
  className?: string;
}

export default function TicketIcon({
  size = "medium",
  className,
}: TicketIconProps) {
  const sizeClasses = {
    "extra-small": "extra_small_icon",
    small: "small_icon",
    medium: "icon",
    large: "large_icon",
    "extra-large": "extra_large_icon",
  };

  return <IoTicketSharp className={`${sizeClasses[size]} ${className}`} />;
}
