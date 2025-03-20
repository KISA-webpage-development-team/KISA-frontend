import React from 'react';
import {View, Text, StyleSheet, KeyboardTypeOptions} from 'react-native';
import CustomLabel from './CustomLabel';
import CustomInput from './CustomInput';
import ErrorDisplay from './ErrorDisplay'; // Uncomment if you have this component

export default function CustomField({
  value,
  setValue,
  label,
  placeholder = 'Enter something here...',
  type = 'text',
  required = false,
  isError = false,
  errorState = 'none',
  errorMsg = 'Error',
}) {
  // Mapping input types to React Native `keyboardType`
  const keyboardTypeMap: Record<string, KeyboardTypeOptions> = {
    text: 'default',
    number: 'numeric',
    email: 'email-address',
    year: 'numeric',
    date: 'default', // React Native does not have a date type, use a DatePicker instead
  };

  return (
    <View style={styles.container}>
      <CustomLabel text={label} required={required} />
      <CustomInput
        keyboardType={keyboardTypeMap[type] || 'default'}
        value={value}
        onChangeText={setValue} // Corrected for React Native
        placeholder={placeholder}
        // required={required}
      />
      {isError && <ErrorDisplay state={errorState} text={errorMsg} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  alert: {
    color: 'orange',
    marginTop: 5,
    fontSize: 12,
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
});
