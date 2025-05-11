import Link from "next/link";
import React from "react";
import { ButtonType } from "./types";
import "./styles.css";

type CustomLinkButtonProps = {
  type?: ButtonType;
  href: string;
  text: string;
  disabled?: boolean;
};

export default function CustomLinkButton({
  type = "primary",
  href,
  text,
  disabled = false,
}: CustomLinkButtonProps) {
  const className = `${
    disabled ? `${type}_button_disabled` : `${type}_button`
  }`;

  if (disabled) {
    return (
      <span className={className} aria-disabled="true">
        {text}
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      {text}
    </Link>
  );
}
