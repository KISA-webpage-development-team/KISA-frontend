import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomField from '../CustomField';

interface FieldProps {
  value: string;
  setValue: (text: string) => void;
  label: string;
  type?: 'text' | 'number' | 'email' | 'year' | 'date';
  placeholder?: string;
  isError?: boolean;
  errorMsg?: string;
  errorState?: 'none' | 'alert' | 'error';
}

interface OptionalFieldsProps {
  fields: FieldProps[];
}

export default function OptionalFields({fields}: OptionalFieldsProps) {
  return (
    <View style={styles.container}>
      {fields.map(
        (
          {
            value,
            setValue,
            label,
            type,
            placeholder,
            isError,
            errorMsg,
            errorState,
          },
          index,
        ) => (
          <View key={index} style={styles.fieldContainer}>
            <CustomField
              value={value}
              setValue={setValue}
              label={label}
              required={false}
              type={type}
              placeholder={placeholder}
              isError={isError}
              errorMsg={errorMsg}
              errorState={errorState}
            />
          </View>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 24,
    width: '100%',
  },
  fieldContainer: {
    width: '100%',
  },
});
