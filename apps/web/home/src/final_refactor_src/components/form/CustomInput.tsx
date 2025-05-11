import React, { memo } from "react";
import "./styles.css";

type CustomInputProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  invalid?: boolean;
  required?: boolean;
};

const CustomInput = ({
  type,
  value,
  onChange,
  onBlur,
  placeholder = "",
  invalid = false,
  required = false,
}: CustomInputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      className={`input
      ${invalid ? "invalid_input" : ""}
      `}
    />
  );
};

export default memo(CustomInput);
