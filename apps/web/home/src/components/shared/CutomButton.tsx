// Button Abstraction

// [TODO] need to refine this component and generalize over the project

import React, { ReactNode } from "react";

// [RESPONSIVE DESIGN]
// different styling based on sm | md | lg

type ButtonProps = {
  type?: "primary" | "secondary";
  // size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  btnText?: string;
  beforeIcon?: ReactNode;
};

export default function CutomButton({
  type = "primary",
  //   size = "md", // "sm" | "md" | "lg"
  onClick,
  disabled = false,
  btnText,
  beforeIcon = null,
}: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`${type}_btn`}>
      <span className="hidden md:block">{beforeIcon}</span>
      <span className={`${type}_btn_text`}>{btnText}</span>
    </button>
  );
}
