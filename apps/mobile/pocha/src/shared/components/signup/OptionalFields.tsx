import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomFormItem from '../form/CustomFormItem';

interface FieldProps {
  value: string | Date;
  setValue: (value: string | Date) => void;
  label: string;
  type?: string;
  placeholder?: string;
  validationRules?: ((value: string | Date) => string | null)[];
}

interface OptionalFieldsProps {
  fields: FieldProps[];
}

export default function OptionalFields({fields}: OptionalFieldsProps) {
  return (
    <View style={styles.container}>
      {fields.map(
        (
          {value, setValue, label, type = 'text', placeholder, validationRules},
          index,
        ) => (
          <View key={`${label}-${index}`} style={styles.fieldWrapper}>
            <CustomFormItem
              labelText={label}
              type={type}
              value={value}
              onChange={setValue}
              placeholder={placeholder}
              validationRules={validationRules}
              required={false}
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
