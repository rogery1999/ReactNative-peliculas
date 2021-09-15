import React, { useContext, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ColorContext } from '../context/Gradient.context';
import useFade from '../hooks/useFade';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const GradientBackground = ({ children }: IProps) => {
  const {
    colorState: { actualColor, previusColors },
    finishAnimation,
  } = useContext(ColorContext);
  const { fadeIn, opacity, fadeOut } = useFade();
  useEffect(
    () =>
      fadeIn(() => {
        finishAnimation();
        fadeOut();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actualColor]
  );
  return (
    <View style={styles.gradient}>
      <LinearGradient
        colors={[previusColors.primary, previusColors.secondary, 'white']}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 0.6 }}
      />
      <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity }}>
        <LinearGradient
          colors={[actualColor.primary, actualColor.secondary, 'white']}
          style={{ ...StyleSheet.absoluteFillObject }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.6, y: 0.6 }}
        />
      </Animated.View>
      {children}
    </View>
  );
};

export default GradientBackground;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
