import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
type CustomLabelProps = {
  text?: string;
  required?: boolean;
};

export default function CustomLabel({
  text = '',
  required = false,
}: CustomLabelProps) {
  return (
    <View style={styles.container}>
      {text ? (
        <Text style={[styles.labelText /*, sejongHospitalBold*/]}>{text}</Text>
      ) : null}
      {required ? <Text style={styles.required}>*</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Sejong-hospital-Bold',
  },
  required: {
    fontSize: 14,
    color: 'red',
    marginLeft: 4,
  },
});
