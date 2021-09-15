import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import HorizontalSlider from '../components/HorizontalSlider';
import MoviePoster from '../components/MoviePoster';
import { ColorContext } from '../context/Gradient.context';
import { getColors, getMovieImage } from '../helpers/helpers';
import useMovies from '../hooks/useMovies';
import { Movie } from '../interfaces/movieDB.interface';
import { IStackNavigationProps } from '../navigation/Navigation.controller';
import DEFAULT_VALUES from '../utils/default.constants';
import GradientBackground from './GradientBackground';

interface Iprops
  extends StackScreenProps<IStackNavigationProps, 'HomeScreen'> {}

const HomeScreen = ({ navigation }: Iprops) => {
  const { changeColor } = useContext(ColorContext);
  const { peliculasState } = useMovies();
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const goDetail = (movie: Movie) => {
    navigation.navigate('DetailScreen', { movie });
  };
  const getPosterColor = async (index: number) => {
    const { poster_path } = peliculasState.now_playing[index];
    const uri = getMovieImage(poster_path);
    const { primary, secondary } = await getColors(uri!);
    changeColor({ primary, secondary });
  };
  useEffect(() => {
    if (peliculasState.now_playing.length > 0) {
      getPosterColor(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peliculasState.now_playing]);
  if (peliculasState.loading) {
    return (
      <View style={[ownStyles.page, ownStyles.loadingpage]}>
        <ActivityIndicator color='red' size={100} />
      </View>
    );
  }
  return (
    <GradientBackground>
      <ScrollView>
        <View style={[{ marginTop: top + 20 }]}>
          {/* Peliculas principales */}
          <View
            style={{
              height:
                DEFAULT_VALUES.MOVIE_CARD.height +
                DEFAULT_VALUES.MOVIE_CARD_COMMON.offsetShadow,
            }}>
            <Carousel
              data={peliculasState.now_playing}
              renderItem={({ item }) => (
                <MoviePoster
                  key={item.id}
                  pelicula={item}
                  onPress={() => goDetail(item)}
                  dimentions={{
                    height: DEFAULT_VALUES.MOVIE_CARD.height,
                    width: DEFAULT_VALUES.MOVIE_CARD.width,
                  }}
                />
              )}
              sliderWidth={width}
              itemWidth={DEFAULT_VALUES.MOVIE_CARD.width}
              layout='default'
              activeSlideAlignment='center'
              onSnapToItem={getPosterColor}
            />
          </View>
          {/* Peliculas populares */}
          <HorizontalSlider
            title='Populares'
            list={peliculasState.populars}
            width={width}
            onPress={goDetail}
          />
          {/* Peliculas topRated */}
          <HorizontalSlider
            title='Más Valoradas'
            list={peliculasState.top_rated}
            width={width}
            onPress={goDetail}
          />
          {/* Peliculas upcoming */}
          <HorizontalSlider
            title='Pronto'
            list={peliculasState.upcoming}
            width={width}
            onPress={goDetail}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default HomeScreen;

const ownStyles = StyleSheet.create({
  page: {
    flex: 1,
  },
  loadingpage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  homePage: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
