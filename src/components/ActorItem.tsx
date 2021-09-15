import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getMovieImage } from '../helpers/helpers';
import { Cast } from '../interfaces/movieDB.interface';

interface IProps {
  actor: Cast;
}

const ActorItem = ({ actor }: IProps) => {
  const uri = getMovieImage(actor.profile_path ?? '');
  return (
    <View style={ownStyles.itemContainer}>
      {actor.profile_path ? (
        <View style={[ownStyles.imageContainer, ownStyles.imageCommons]}>
          <Image
            style={[ownStyles.image, ownStyles.imageCommons]}
            source={{ uri }}
          />
        </View>
      ) : null}
      <View style={ownStyles.actorInfo}>
        <Text style={ownStyles.actorName}>{actor.name}</Text>
        {actor.character ? (
          <Text style={ownStyles.character}>{actor.character}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default ActorItem;

const ownStyles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    backgroundColor: '#fafbfd',
    marginTop: 15,
    marginHorizontal: 18,
    marginBottom: 30,
    paddingRight: 4,
  },
  actorName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  character: {
    fontSize: 11,
    fontWeight: 'normal',
    opacity: 0.7,
  },
  image: {},
  imageContainer: {},
  imageCommons: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  actorInfo: {
    alignSelf: 'center',
    marginLeft: 8,
  },
});
