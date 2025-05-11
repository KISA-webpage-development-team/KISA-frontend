import React from "react";
import CancelIcon from "../ui/CancelIcon";

export default function MobileMenuCloseButton({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const handleClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className="z-20 focus:outline-none focus:bg-transparent"
    >
      {isMobileMenuOpen && <CancelIcon />}
    </button>
  );
}
