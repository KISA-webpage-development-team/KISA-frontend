import {sejongHospitalBold} from '@/utils/fonts/textFonts';
import {Spinner} from '@nextui-org/react';
import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  label?: string;
}

export default function LoadingSpinner({
  fullScreen = true,
  label = '로딩중입니다',
}: LoadingSpinnerProps) {
  return (
    <div
      className={`
        ${
          fullScreen
            ? 'fixed top-0 left-0 w-full h-full z-50'
            : 'h-full w-full mt-8'
        } 
        flex justify-center items-center bg-white`}>
      <Spinner
        size="lg"
        label={label}
        color="secondary"
        labelColor="primary"
        className={`${sejongHospitalBold.className}`}
      />
    </div>
  );
}
