import React from 'react';

interface HeartSvgProps {
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
}

const HeartSvg: React.FC<HeartSvgProps> = ({
  height = '13px',
  width = '15px',
  fill = 'none',
  stroke = '#191919',
}) => (
  <svg width={width} height={height} viewBox="0 0 15.072 13.028">
    <path
      id="패스_21"
      data-name="패스 21"
      d="M-2192.684,1089.5a.662.662,0,0,1-.918,0l-5.433-5.285a3.733,3.733,0,0,1,0-5.379,3.988,3.988,0,0,1,5.528,0l.363.354.365-.354a3.987,3.987,0,0,1,5.527,0,3.731,3.731,0,0,1,0,5.379Z"
      transform="translate(2200.679 -1077.219)"
      fill={fill}
      stroke={stroke}
      strokeWidth="1"
    />
  </svg>
);

export default HeartSvg;
