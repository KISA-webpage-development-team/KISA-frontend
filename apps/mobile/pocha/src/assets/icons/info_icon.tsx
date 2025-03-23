// src/assets/icons/InfoIcon.tsx
import React from 'react';
import Svg, {Path} from 'react-native-svg';

type MyIconProps = {
  width?: number;
  height?: number;
  fill?: string;
};

const InfoIcon: React.FC<MyIconProps> = ({
  width = 24,
  height = 24,
  fill = '#000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.5 7.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1zM13 18V9h-2v1h1v8h-1v1h3v-1zm9.8-5.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"
        fill={fill}
      />
    </Svg>
  );
};

export default InfoIcon;
