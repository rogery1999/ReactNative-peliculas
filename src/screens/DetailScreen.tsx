import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MovieDetails from '../components/MovieDetails';
import { getMovieImage } from '../helpers/helpers';
import useMovieDetails from '../hooks/useMovieDetails';
import { IStackNavigationProps } from '../navigation/Navigation.controller';

interface IProps
  extends StackScreenProps<IStackNavigationProps, 'DetailScreen'> {}

const DetailScreen = ({ route, navigation }: IProps) => {
  const { movie } = route.params;
  const { top } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const uri = getMovieImage(movie.poster_path);
  const getWidth = () => (height > width ? width : height);
  const getImgHeight = () =>
    parseInt(((height > width ? height : width) * 0.7).toFixed(0), 10);
  const { movieFull, cast, isLoading } = useMovieDetails(movie.id);
  return (
    <ScrollView>
      <View style={[ownStyles.page, { paddingTop: top }]}>
        <View
          style={[
            ownStyles.imageContainer,
            ownStyles.imgBorders,
            { width: getWidth(), height: getImgHeight() },
          ]}>
          <Image
            source={{
              uri,
            }}
            style={[ownStyles.image, ownStyles.imgBorders]}
          />
        </View>
        <View style={[ownStyles.contentContainer, { width: getWidth() }]}>
          <Text style={ownStyles.subtitle}>{movie.original_title}</Text>
          <Text style={ownStyles.title}>{movie.title}</Text>
          <View style={ownStyles.detailsContainer}>
            {isLoading ? (
              <ActivityIndicator
                size={30}
                color='grey'
                style={ownStyles.activityLoader}
              />
            ) : (
              <MovieDetails cast={cast!} movieFull={movieFull!} />
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={ownStyles.closeIcon}
        onPress={() => navigation.pop()}>
        <Icon name='chevron-back-circle-outline' color='#5f7f7a' size={50} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailScreen;

const ownStyles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    marginBottom: 20,
  },
  imgBorders: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.5,
  },
  genreContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  detailsContainer: { marginTop: 7 },
  activityLoader: { alignSelf: 'center', marginTop: 20 },
  closeIcon: {
    position: 'absolute',
    elevation: 100,
    zIndex: 999,
    left: 5,
    top: 5,
  },
});
