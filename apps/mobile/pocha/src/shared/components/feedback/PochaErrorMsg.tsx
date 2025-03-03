// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
import React from 'react';

interface PochaErrorMsgProps {
  message: string;
}

export default function PochaErrorMsg({message}: PochaErrorMsgProps) {
  return <span className={`text-red-500 text-center`}>{message}</span>;
}
