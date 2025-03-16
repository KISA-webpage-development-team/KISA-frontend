// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface PochaErrorMsgProps {
  message: string;
}

export default function PochaErrorMsg({message}: PochaErrorMsgProps) {
  return <Text style = {styles.message}>{message}</Text>;
}


const styles = StyleSheet.create({
  message: {
    color: '#EF4444',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
});