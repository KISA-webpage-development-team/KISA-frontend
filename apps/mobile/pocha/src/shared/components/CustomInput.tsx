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
  onPress?: () => void;
}

export default function CustomInput({
  keyboardType = 'default',
  value,
  onChangeText,
  placeholder = 'Enter input!',
  editable = true,
  onPress,
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
    borderColor: '#D1D5DB',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    fontSize: 14,
    alignSelf: 'center',
  },
});
