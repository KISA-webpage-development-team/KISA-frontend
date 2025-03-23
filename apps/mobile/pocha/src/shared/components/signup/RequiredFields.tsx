import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomField from '../CustomField';

interface FieldProps {
  value: string;
  setValue: (text: string) => void;
  label: string;
  placeholder?: string;
  error?: boolean;
  errorMsg?: string;
  errorState?: string;
}

interface RequiredFieldsProps {
  fields: FieldProps[];
}

export default function RequiredFields({fields}: RequiredFieldsProps) {
  return (
    <View style={styles.container}>
      {fields.map(
        (
          {value, setValue, label, placeholder, error, errorMsg, errorState},
          index,
        ) => (
          <View key={index} style={styles.fieldWrapper}>
            <CustomField
              value={value}
              setValue={setValue}
              label={label}
              required={true}
              placeholder={placeholder}
              error={error}
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
    gap: 8,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
});
