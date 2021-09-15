import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getMovieImage } from '../helpers/helpers';
import { Movie } from '../interfaces/movieDB.interface';

interface IProps {
  pelicula: Movie;
  onPress: () => void;
  dimentions: ICardDimentions;
  marginHorizontal?: number;
}

export interface ICardDimentions {
  height: number;
  width: number;
}

const CARD_BORDER_RADIUS = 20;

const MoviePoster = ({
  onPress,
  pelicula,
  dimentions,
  marginHorizontal = 0,
}: IProps) => {
  const uri = getMovieImage(pelicula.poster_path);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.touchable, ...dimentions, marginHorizontal }}
      activeOpacity={0.6}>
      <View style={[styles.card]}>
        <Image
          source={{
            uri,
          }}
          style={[styles.image]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MoviePoster;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: CARD_BORDER_RADIUS,
  },
  card: {
    flex: 1,
    borderRadius: CARD_BORDER_RADIUS,
    backgroundColor: 'white',
  },
  touchable: {
    borderRadius: CARD_BORDER_RADIUS,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 10,
  },
});
