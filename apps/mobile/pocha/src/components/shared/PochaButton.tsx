// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
// reason for TouchableOpacity over Button = more styling options

interface PochaButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  widthPercentage?: number;
  type?: 'button' | 'submit' | 'reset';
}

export default function PochaButton({
  label,
  icon,
  onClick,
  disabled = false,
  widthPercentage = 100,
}: PochaButtonProps) {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      style={[
        styles.button,
        {width: `${widthPercentage}%`},
        disabled && styles.disabledButton,
      ]}
      activeOpacity={0.8}>
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4B90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A3A3A3',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // gap is not fully supported in RN, so you may need marginRight on icon manually if older version.
  },
  label: {
    color: 'white',
    fontSize: 18,
    lineHeight: 24,
  },
  icon: {
    marginRight: 8, // manual spacing if needed
  },
});
