import React from 'react';
import {View, Animated} from 'react-native';
import {PositionProps} from '../../App';

interface Props {
  color: string;
  position: PositionProps;
  size?: number;
}

const Circle: React.FC<Props> = ({color, position, size = 60}) => {
  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: color,
        zIndex: -1,
        position: 'absolute',
        top: `${position.x}%`,
        left: `${position.y}%`,
      }}
    />
  );
};

export default Circle;
