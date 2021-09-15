import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Movie } from '../interfaces/movieDB.interface';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';

export type IStackNavigationProps = {
  HomeScreen: undefined;
  DetailScreen: { movie: Movie };
};

const Stack = createStackNavigator<IStackNavigationProps>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
        },
      }}>
      <Stack.Screen
        name='HomeScreen'
        options={{ title: 'Home' }}
        component={HomeScreen}
      />
      <Stack.Screen
        name='DetailScreen'
        options={{ title: 'Detail' }}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};
