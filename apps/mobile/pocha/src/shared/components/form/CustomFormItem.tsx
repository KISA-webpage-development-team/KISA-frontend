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

import React, {memo, useState} from 'react';
import {View, Text, StyleSheet, KeyboardTypeOptions} from 'react-native';
import CustomInput from './CustomInput';
import CustomLabel from './CustomLabel';
import CustomDatePicker from './CustomDatePicker';

type ValidationRule = (value: string) => string | null;

type CustomFormItemProps = {
  labelText: string;
  type: string;
  value: string | Date;
  onChange: (text: string | Date) => void;
  placeholder?: string;
  validationRules?: ValidationRule[];
  required?: boolean;
};

// Map HTML input types to React Native keyboard types
const keyboardTypeMap: Record<string, KeyboardTypeOptions> = {
  text: 'default',
  number: 'numeric',
  email: 'email-address',
  tel: 'phone-pad',
  url: 'url',
  date: 'numeric',
  // Add more mappings as needed
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
  value: string | Date,
  rules: ValidationRule[] = [],
) => {
  const [error, setError] = useState<string | null>(null);
  const [requiredError, setRequiredError] = useState<string | null>(null);

  const validate = (val: string | Date = value) => {
    // Check for required field first
    if (required && (val === 'NaN' || !(val as string).trim())) {
      setRequiredError('필수 항목입니다.');
      setError(null);
      return false;
    }
    setRequiredError(null);

    // Check other validation rules
    for (const rule of rules) {
      const result = rule(val as string);
      if (result) {
        setError(result);
        return false;
      }
    }
    setError(null);
    return true;
  };

  return {requiredError, error, validate};
};

export default function CustomFormItem({
  labelText,
  type,
  value,
  onChange,
  placeholder = '',
  validationRules = [],
  required = false,
}: CustomFormItemProps) {
  const {requiredError, error, validate} = useValidation(
    required,
    value,
    validationRules,
  );

  const handleChange = (text: string) => {
    onChange(text);
    validate(text);
  };

  const handleDateChange = (date: Date) => {
    console.log('date: ', date);
    onChange(date.toISOString());
    validate(date.toISOString());
  };

  return (
    <View style={styles.container}>
      <CustomLabel text={labelText} required={required} />

      {type === 'date' ? (
        <CustomDatePicker
          value={value as Date}
          onChangeDate={handleDateChange}
        />
      ) : (
        <CustomInput
          value={value as string}
          onChangeText={handleChange}
          placeholder={placeholder}
          keyboardType={keyboardTypeMap[type] || 'default'}
          editable={true}
        />
      )}
      {(requiredError || error) && (
        <Text style={styles.errorText}>{requiredError || error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    rowGap: 10,
  },
  errorText: {
    position: 'absolute',
    bottom: -18,
    left: 0,
    color: '#EF4444',
    fontSize: 12,
    fontFamily: 'Sejong-hospital-Bold',
  },
});
