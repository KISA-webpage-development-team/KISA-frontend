import React from 'react';
import {TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native';

interface CustomInputProps {
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void; // Ensure onChangeText is correctly typed
  placeholder?: string;
}

export default function CustomInput({
  keyboardType = 'default',
  value,
  onChangeText,
  placeholder = 'Enter input!',
}: CustomInputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={styles.input}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    fontSize: 14,
  },
});
