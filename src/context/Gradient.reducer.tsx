import { ColorState, ImageColors } from './Gradient.context';

const setNewColor = (state: ColorState, payload: ImageColors): ColorState => {
  return {
    ...state,
    actualColor: { ...payload },
    animating: true,
  };
};

const finishAnimation = (state: ColorState): ColorState => ({
  ...state,
  previusColors: { ...state.actualColor },
  animating: false,
});

type Action =
  | { type: 'setNewColor'; payload: ImageColors }
  | { type: 'finishAnimation' };

const colorReducer = (state: ColorState, action: Action): ColorState => {
  switch (action.type) {
    case 'setNewColor':
      return setNewColor(state, action.payload);
    case 'finishAnimation':
      return finishAnimation(state);
    default:
      return state;
  }
};

export default colorReducer;
