import { FaMinus } from "react-icons/fa6";
import "./styles.css";

interface PochaMinusIconProps {
  size?: "small" | "medium" | "large";
}

export default function PochaMinusIcon({
  size = "medium",
}: PochaMinusIconProps) {
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

  return <FaMinus className={`${getIconClassName(size)}`} />;
}
