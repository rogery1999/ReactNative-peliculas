import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ColorProvider } from './src/context/Gradient.context';
import { StackNavigation } from './src/navigation/Navigation.controller';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigation />
        {/* <FadeScreen /> */}
      </AppState>
    </NavigationContainer>
  );
};

const AppState = ({ children }: IProps) => (
  <ColorProvider>{children}</ColorProvider>
);

export default App;
