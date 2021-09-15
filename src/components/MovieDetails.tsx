import currencyFormatter from 'currency-formatter';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast, MovieFull } from '../interfaces/movieDB.interface';
import ActorItem from './ActorItem';

interface IProps {
  movieFull: MovieFull;
  cast: Cast[];
}

const MovieDetails = ({ movieFull, cast }: IProps) => {
  return (
    <>
      {/* Detalles */}
      <View style={ownStyles.movieMenuContainer}>
        <Icon name='star-outline' size={18} color='#ffc600' />
        <Text style={[ownStyles.averageText, ownStyles.menuDetailText]}>
          {movieFull.vote_average}
        </Text>
        <Text style={ownStyles.menuDetailText}> - </Text>
        <Text style={ownStyles.menuDetailText}>
          {' '}
          {movieFull.genres.map(value => value.name).join(', ')}
        </Text>
      </View>
      {/* Historia */}
      <Text style={ownStyles.overviewText}>{movieFull.overview}</Text>
      {/* Fondos */}
      <View style={ownStyles.presupuestoContainer}>
        <Text style={ownStyles.presupuestoLabel}>Presupuesto:</Text>
        <Text>
          {movieFull.budget === 0
            ? 'Desconocido'
            : currencyFormatter.format(movieFull.budget, { code: 'USD' })}
        </Text>
      </View>
      {/* Casting */}
      <View style={ownStyles.castContainer}>
        <Text style={ownStyles.actoresLabel}>Actores</Text>
        <FlatList
          data={cast}
          renderItem={({ item }) => <ActorItem key={item.id} actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default MovieDetails;

const ownStyles = StyleSheet.create({
  movieDetails: {
    backgroundColor: 'green',
  },
  movieMenuContainer: {
    flexDirection: 'row',
  },
  averageText: {
    marginLeft: 8,
  },
  menuDetailText: {
    opacity: 0.8,
  },
  overviewText: {
    marginTop: 9,
    textAlign: 'justify',
    fontSize: 14,
  },
  presupuestoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  presupuestoContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  castContainer: {
    marginTop: 10,
  },
  actoresLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
