import ImageColors from 'react-native-image-colors';

export const getMovieImage = (path: string) =>
  `https://image.tmdb.org/t/p/w500/${path}`;

export const getColors = async (uri: string) => {
  const colores = await ImageColors.getColors(uri, {});
  const colors = {
    primary: '',
    secondary: '',
  };
  if (colores.platform === 'android') {
    colors.primary = colores.dominant ?? '#fff';
    colors.secondary = colores.average ?? '#fff';
  } else {
    colors.primary = colores.background;
    colors.secondary = colores.secondary;
  }
  return colors;
};

export const invertHex = (hex: string) => {
  // eslint-disable-next-line no-bitwise
  return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
};
