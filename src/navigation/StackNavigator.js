import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial1 from '../screens/telaInicial';
const Stack = createNativeStackNavigator();
import LoginScreen from '../screens/Login'
export default function StackNavigator() {
return (
 <Stack.Navigator initialRouteName='TelaInicial'>
    <Stack.Screen name='TelaInicial' component={TelaInicial1}  options={{ headerShown: false }} />
    <Stack.Screen name='TelaLogin' component={LoginScreen} options={{ headerShown: false }} />
 
 </Stack.Navigator>


)


}