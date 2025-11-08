import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial1 from '../screens/telaInicial';
const Stack = createNativeStackNavigator();
import LoginScreen from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import CompletarDados from '../screens/CompletarDados'
export default function StackNavigator() {
return (
 <Stack.Navigator initialRouteName='TelaInicial'>
    <Stack.Screen name='TelaInicial' component={TelaInicial1}  options={{ headerShown: false }} />
    <Stack.Screen name='TelaLogin' component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name='Cadastro' component={Cadastro}   options={{headerShown: false}} />
    <Stack.Screen name='CompletarDados' component={CompletarDados} options={{headerShown: false}} />
 </Stack.Navigator>


)


}