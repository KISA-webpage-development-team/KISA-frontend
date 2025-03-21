import React from 'react';
// sejongHospital 글꼴 나중에 추가
// import { sejongHospitalBold } from "@/utils/fonts/textFonts";

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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  required: {
    color: 'red',
    marginLeft: 4,
    fontSize: 16,
  },
});
