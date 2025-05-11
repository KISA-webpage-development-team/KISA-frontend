import React from "react";
import { ButtonType } from "./types";
import "./styles.css";

type CustomButtonProps = {
  type?: ButtonType;
  text: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  forSubmit?: boolean;
  className?: string;
};

export default function CustomButton({
  type = "primary",
  text,
  disabled = false,
  onClick,
  forSubmit = false,
  className = "",
}: CustomButtonProps) {
  const btnClassName = `${type}_button ${
    disabled ? `${type}_button_disabled` : ""
  } ${className}`.trim();

  return (
    <button
      type={forSubmit ? "submit" : "button"}
      className={btnClassName}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {text}
    </button>
  );
}
