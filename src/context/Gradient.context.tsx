import React, { createContext, useReducer } from 'react';
import colorReducer from './Gradient.reducer';

export interface ImageColors {
  primary: string;
  secondary: string;
}

export interface ColorState {
  actualColor: ImageColors;
  previusColors: ImageColors;
  animating: boolean;
}

const defaultColorState: ColorState = {
  actualColor: { primary: 'transparent', secondary: 'transparent' },
  previusColors: { primary: 'transparent', secondary: 'transparent' },
  animating: false,
};

interface ColorContextState {
  colorState: ColorState;
  changeColor: (colors: ImageColors) => void;
  finishAnimation: () => void;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const ColorContext = createContext({} as ColorContextState);

export const ColorProvider = ({ children }: IProps) => {
  const [colorState, dispatch] = useReducer(colorReducer, defaultColorState);
  const changeColor = (colors: ImageColors) =>
    dispatch({ type: 'setNewColor', payload: { ...colors } });
  const finishAnimation = () => dispatch({ type: 'finishAnimation' });
  return (
    <ColorContext.Provider value={{ colorState, changeColor, finishAnimation }}>
      {children}
    </ColorContext.Provider>
  );
};
