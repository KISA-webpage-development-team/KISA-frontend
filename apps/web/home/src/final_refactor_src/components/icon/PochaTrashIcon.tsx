import { FaRegTrashAlt } from "react-icons/fa";
import "./styles.css";

interface PochaTrashIconProps {
  size?: "small" | "medium" | "large";
}

export default function PochaTrashIcon({
  size = "medium",
}: PochaTrashIconProps) {
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

  return <FaRegTrashAlt className={`${getIconClassName(size)}`} />;
}
