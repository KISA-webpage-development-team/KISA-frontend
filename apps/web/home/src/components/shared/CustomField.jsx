// CustomField.jsx
// : Sign up form field abstraction
// value, setValue: user input value, setter
// label: field label
// placeholder: field placeholder
// type: "text" (default) | "number" | "email" | "year" | "date"
// required: required field

// isError: error를 display하는 조건 (null이면 error를 어떤 상황에서도 display 하지 않음)
// errorState: "none" (default) | "alert" | "error"
// errorMsg: error message

import React from "react";

import CustomLabel from "./CustomLabel";
import CustomInput from "./CustomInput";
import ErrorDisplay from "./ErrorDisplay";

export default function CustomField({
  value,
  setValue,
  label,
  placeholder = "",
  type = "text",
  required = false,
  isError = false,
  errorState = "none",
  errorMsg,
}) {
  return (
    <div>
      <CustomLabel htmlFor={type} text={label} required={required} />
      <CustomInput
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
      {isError && <ErrorDisplay state={errorState} text={errorMsg} />}
    </div>
  );
}
