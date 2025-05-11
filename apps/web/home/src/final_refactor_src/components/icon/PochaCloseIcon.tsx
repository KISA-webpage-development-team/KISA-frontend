import { RxCross2 } from "react-icons/rx";
import "./styles.css";

interface PochaCloseIconProps {
  size?: "small" | "medium" | "large" | "extra-large";
}

export default function PochaCloseIcon({
  size = "medium",
}: PochaCloseIconProps) {
  const getIconClassName = (
    size: "small" | "medium" | "large" | "extra-large"
  ) => {
    switch (size) {
      case "small":
        return "small_icon";
      case "medium":
        return "icon";
      case "large":
        return "large_icon";
      case "extra-large":
        return "extra_large_icon";
      default:
        return "icon";
    }
  };

  return <RxCross2 className={`${getIconClassName(size)}`} />;
}
