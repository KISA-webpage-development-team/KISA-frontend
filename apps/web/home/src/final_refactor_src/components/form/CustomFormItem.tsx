// CustomFormItem.tsx
// : Form Item Abstraction
// [NOTE] 웬만하면 이 코드는 건드리지 마세요. 하위 레벨의 추상화 코드입니다.
// 대신, 이 컴포넌트를 어떻게 사용하는지만 Props로 확인해주세요.

// <Props>
// - htmlFor: input field's id (same as html tag label's htmlFor attribute)
// - labelText: label text for the input field
// - type: input field's type (e.g. text, number, email, password)
// - value: input field's value
// - onChange: input field's onChange event handler (usually useCallback function to memoize)
// - placeholder?: input field's placeholder text
// - validationRules?: an array of validation rules (e.g. email validation, password validation)
// - required?: is the input field required?

import React, { memo, useState } from "react";
import CustomInput from "./CustomInput";
import CustomLabel from "./CustomLabel";

type ValidationRule = (value: string) => string | null;

type CustomFormItemProps = {
  htmlFor: string;
  labelText: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  validationRules?: ValidationRule[];
  required?: boolean;
};

/**
 * @desc Custom hook for form validation
 * @param required: is the field required?
 * @param value: the value of the input field
 * @param rules: an array of validation rules
 * @returns `requiredError`: error message for required field, `error`: error message for other validation rules, `validate`: function to validate the input field
 */
const useValidation = (
  required: boolean,
  value: string,
  rules: ValidationRule[] = []
) => {
  const [error, setError] = useState<string | null>(null);
  const [requiredError, setRequiredError] = useState<string | null>(null);

  const validate = (val: string = value) => {
    // Check for required field first
    if (required && (val === "NaN" || !val.trim())) {
      setRequiredError("");
      setError(null);
      return false;
    }
    setRequiredError(null);

    // Check other validation rules
    for (const rule of rules) {
      const result = rule(val);
      if (result) {
        setError(result);
        return false;
      }
    }
    setError(null);
    return true;
  };

  return { requiredError, error, validate };
};

const CustomFormItem = ({
  htmlFor,
  labelText,
  type,
  value,
  onChange,
  placeholder = "",
  validationRules = [],
  required = false,
}: CustomFormItemProps) => {
  const { requiredError, error, validate } = useValidation(
    required,
    value,
    validationRules
  );

  const handleBlur = () => {
    validate();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    validate(e.target.value);
  };

  return (
    <div
      className="relative
    flex flex-col gap-1 items-start"
    >
      <CustomLabel htmlFor={htmlFor} text={labelText} required={required} />

      <CustomInput
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        invalid={requiredError !== null || error !== null}
      />
      {(requiredError || error) && (
        <span
          className="absolute bottom-0 
          left=-0 top-full mt-1
         text-red-500 text-xs font-bold"
        >
          {requiredError || error}
        </span>
      )}
    </div>
  );
};

export default memo(CustomFormItem);
