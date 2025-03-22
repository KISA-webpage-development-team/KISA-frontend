import React from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
  View,
} from 'react-native';

interface CustomInputProps {
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void; // Ensure onChangeText is correctly typed
  placeholder?: string;
  editable?: boolean;
}

export default function CustomInput({
  keyboardType = 'default',
  value,
  onChangeText,
  placeholder = 'Enter input!',
  editable = true,
}: CustomInputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={styles.input}
      autoCapitalize="none"
      editable={editable}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 13,
    borderRadius: 10,
    fontSize: 14,
    alignSelf: 'center',
  },
});
