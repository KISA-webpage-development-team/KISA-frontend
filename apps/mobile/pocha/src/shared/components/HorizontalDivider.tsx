import React from 'react';
import {View, StyleSheet} from 'react-native';

type HorizontalDividerProps = {
  color?: 'light' | 'dark';
};

export default function HorizontalDivider({
  color = 'light',
}: HorizontalDividerProps) {
  const dividerColor = color === 'light' ? '#E5E7EB' : '#D1D5DB';

  return <View style={[styles.divider, {backgroundColor: dividerColor}]} />;
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 4,
    borderRadius: 8,
    marginVertical: 14,
  },
});
