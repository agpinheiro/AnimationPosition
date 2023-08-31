import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
} from 'react-native';

export interface PositionProps {
  x: number;
  y: number;
  size: number;
}

interface PropsCircle {
  color: string;
  position: PositionProps;
}
interface PropsState {
  [key: string]: UniqueProps;

}

type UniqueProps = {x: number; y: number; axis: {x: 0 | 1; y: 0 | 1}; size: number};

const App: React.FC = (): JSX.Element => {
  const [position, setPosition] = useState<PropsState>({
    "ft": {x: 100, y: 20, axis: {x: 0, y: 0}, size: 10},
    "sc": {x: 0, y: 0, axis: {x: 0, y: 0}, size: 10},
    "tr": {x: 50, y: 3, axis: {x: 0, y: 0}, size: 10},
    "fr": {x: 40, y: 2, axis: {x: 0, y: 0}, size: 10},
    "fv": {x: 70, y: 11, axis: {x: 0, y: 0}, size: 10},
    "sx": {x: 88, y: 88, axis: {x: 0, y: 0}, size: 10},
    "sv": {x: 22, y: 44, axis: {x: 0, y: 0}, size: 10},
    "et": {x: 33, y: 55, axis: {x: 0, y: 0}, size: 10},
    "nn": {x: 66, y: 77, axis: {x: 0, y: 0}, size: 10},
    "tn": {x: 99, y: 11, axis: {x: 0, y: 0}, size: 10},
  });

  const Circle: React.FC<PropsCircle> = ({color, position}) => {
    return (
      <Animated.View
        style={{
          width: position.size,
          height: position.size,
          borderRadius: position.size,
          backgroundColor: color,
          zIndex: -1,
          position: 'absolute',
          top: `${position.x}%`,
          left: `${position.y}%`,
          // transform: [{translateX: translateX, translateY: translateY}],
        }}
      />
    );
  };

  const Square: React.FC<PropsCircle> = ({color, position}) => {
    return (
      <Animated.View
        style={{
          width: position.size,
          height: position.size,
          backgroundColor: color,
          zIndex: -1,
          position: 'absolute',
          top: `${position.x}%`,
          left: `${position.y}%`,
          transform: [{rotate: `${position.size * 10}deg`}]
        }}
      />
    );
  };

  const Triangle: React.FC<PropsCircle> = ({color, position}) => {
    return (
      <Animated.View
      style={{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderLeftWidth: position.size / 2,
        borderRightWidth: position.size / 2,
        borderBottomWidth: position.size,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
        zIndex: -1,
        position: 'absolute',
        top: `${position.x}%`,
        left: `${position.y}%`,
        transform: [{rotate: `${position.size * 10}deg`}]
      }}
      />
    );
  };

  const handleNumber = (number: number, axis: 0 | 1): number => {
    if (axis === 1) number = number - 0.5;
    if (axis === 0) number = number + 0.5;
    return number;
  };

  const handleAxis = (number: number, axis: 0 | 1): 0 | 1 => {
    if (number === 0) axis = 0;
    if (number === 100) axis = 1;
    return axis;
  };

   const handleAtt = (prev: PropsState) => {
    const keys = Object.keys(prev);
    const att = {} as PropsState
    keys.forEach(key => {
      att[key] = {
        x: handleNumber(prev[key].x, prev[key].axis.x),
        y: handleNumber(prev[key].y, prev[key].axis.y),
        size: prev[key].x,
        axis: {
          x: handleAxis(prev[key].x, prev[key].axis.x),
          y: handleAxis(prev[key].y, prev[key].axis.y),
        },
      }
    })
    return att;
  };



  const handleUpdate = () => {
    handleAtt(position)
    const interval = setInterval(() => {
      setPosition(prev => (handleAtt(prev)));
    }, 25);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    handleUpdate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Circle color="#051BE4" position={position.ft} />
      <Circle color="#0dfa49" position={position.sc} />
      <Circle color="#e405b4" position={position.tr} />
      <Circle color="#fbff00" position={position.fr} />
      <Circle color="#02ebfc" position={position.fv} />
      <Circle color="#121358" position={position.sx} />
      <Triangle color="#e49d05" position={position.sv} />
      <Triangle color="#f5c197" position={position.et} />
      <Square color="#4c00ff" position={position.nn} />
      <Square color="#89eca7" position={position.tn} />
    </SafeAreaView>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'red',
    height: height,
    overflow: 'hidden',
  },
});

export default App;
