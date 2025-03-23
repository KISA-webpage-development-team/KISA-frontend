import React from 'react';
import {View, Text, StyleSheet, KeyboardTypeOptions} from 'react-native';
import CustomLabel from './CustomLabel';
import CustomInput from './CustomInput';
import ErrorDisplay from './ErrorDisplay';

export default function CustomField({
  // Define the types for your props
  value,
  setValue,
  label,
  placeholder = 'Enter something here...',
  type = 'text',
  required = false,
  error = false,
  errorState = 'none',
  errorMsg = 'Error',
}) {
  // Mapping input types to React Native "keyboardType"
  const keyboardTypeMap: Record<string, KeyboardTypeOptions> = {
    text: 'default',
    number: 'numeric',
    email: 'email-address',
    year: 'numeric',
  };

  return (
    <View style={styles.container}>
      <CustomLabel text={label} required={required} />
      <CustomInput
        keyboardType={keyboardTypeMap[type] || 'default'}
        value={value}
        onChangeText={setValue} // Corrected for React Native
        placeholder={placeholder}
      />
      {error && <ErrorDisplay state={errorState} message={errorMsg} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    width: '100%',
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
