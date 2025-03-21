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

interface OptionalFieldsProps {
  fields: FieldProps[];
}

export default function OptionalFields({fields}: OptionalFieldsProps) {
  return (
    <View style={styles.container}>
      {fields.map(
        (
          {value, setValue, label, placeholder, errorMsg, errorState},
          index,
        ) => (
          <View key={index} style={styles.fieldWrapper}>
            <CustomField
              value={value}
              setValue={setValue}
              label={label}
              required={false}
              placeholder={placeholder}
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
