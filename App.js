import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator'; // Importando o StackNavigator
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StackNavigator /> {/* Navegação de telas no StackNavigator */}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}