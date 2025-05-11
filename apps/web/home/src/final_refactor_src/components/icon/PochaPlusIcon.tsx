import { FaPlus } from "react-icons/fa6";
import "./styles.css";

interface PochaPlusIconProps {
  size?: "small" | "medium" | "large";
}

export default function PochaPlusIcon({ size = "medium" }: PochaPlusIconProps) {
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

  return <FaPlus className={`${getIconClassName(size)}`} />;
}
