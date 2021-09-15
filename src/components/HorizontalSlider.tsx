import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../interfaces/movieDB.interface';
import DEFAULT_VALUES from '../utils/default.constants';
import MoviePoster from './MoviePoster';

interface IProps {
  title?: string;
  list: Movie[];
  width: number;
  onPress: (movie: Movie) => void;
}

const HorizontalSlider = ({ list, title, width, onPress }: IProps) => {
  return (
    <View style={{ width }}>
      {title ? <Text style={ownStyles.popularesTitle}>{title}</Text> : null}
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <MoviePoster
            key={item.id}
            pelicula={item}
            onPress={() => onPress(item)}
            dimentions={{
              height: DEFAULT_VALUES.MOVIE_CARD_HORIZONTAL_SLIDER.height,
              width: DEFAULT_VALUES.MOVIE_CARD_HORIZONTAL_SLIDER.width,
            }}
            marginHorizontal={
              DEFAULT_VALUES.MOVIE_CARD_HORIZONTAL_SLIDER.marginHorizontal
            }
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          height:
            DEFAULT_VALUES.MOVIE_CARD_HORIZONTAL_SLIDER.height +
            DEFAULT_VALUES.MOVIE_CARD_COMMON.offsetShadow,
        }}
      />
    </View>
  );
};

export default HorizontalSlider;

const ownStyles = StyleSheet.create({
  popularesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 6,
    marginTop: 2,
  },
});
