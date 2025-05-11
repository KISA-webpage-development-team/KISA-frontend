import { FaArrowRight } from "react-icons/fa6";
import "./styles.css";

interface NextIconTailProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export default function NextIconTail({
  size = "medium",
  color,
}: NextIconTailProps) {
  const getIconClassName = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "small_icon";
      case "medium":
        return "icon";
      case "large":
        return "large_icon";
      default:
        return "icon";
    }
  };

  return (
    <FaArrowRight
      className={`${getIconClassName(size)}`}
      style={{ color: color }}
    />
  );
}
