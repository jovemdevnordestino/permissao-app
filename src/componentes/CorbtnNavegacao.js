import React from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';

export default function CorbtnNavegacao() {
  useEffect(() => {
    // Define a cor da barra de navegação
    NavigationBar.setBackgroundColorAsync('#00000000'); // preto
    // Define o estilo dos ícones (claro ou escuro)
    NavigationBar.setButtonStyleAsync('dark'); // 'light' ou 'dark'
  }, []);

  return null;
}
