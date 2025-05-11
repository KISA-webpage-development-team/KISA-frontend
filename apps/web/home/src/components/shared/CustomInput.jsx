import React from "react";

export default function CustomInput({
  type,
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className=" w-full
      border border-gray-300 p-3 rounded-lg
      mt-2 
      focus:outline-michigan-blue text-sm md:text-base
      "
    />
  );
}
