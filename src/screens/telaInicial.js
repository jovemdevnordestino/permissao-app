import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CorbtnNavegacao from '../componentes/CorbtnNavegacao';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// variaveis 
const { width, height } = Dimensions.get('screen'); //dimensões da tela  do usuario 

export default function TelaInicial1() {
    const navigation = useNavigation();
    //FUNCAO CARREGAR DADOS DO TOKEN DE AUTENTICACAO SALVO NA MEMORIA
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('tokenAutenticacao');
            if (jsonValue) {
                console.log('Usuário já cadastrado:', JSON.parse(jsonValue));
                navigation.navigate('CompletarDados')
            } else {
                console.log('Usuário não cadastrado');
            }
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Erro ao acessar o AsyncStorage:', e);
        };
    }
    getData()
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <CorbtnNavegacao />
            <View style={Styles.view}>
                <Image style={Styles.img}
                    source={require('../../assets/imagemTelaInicial.jpg')}
                    resizeMode='cover'
                />
                <TouchableOpacity title='Acessar' onPress={() => navigation.navigate('TelaLogin')} style={Styles.btnEntrar}>
                    <View style={Styles.espacoBtn}>
                        <Text style={Styles.txtEntrar}>Acessar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>


    )

}
const Styles = StyleSheet.create({

    view: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',

    },
    btnEntrar: {
        height: 60,
        width: 200,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 25,
        marginBottom: 25,
        alignItems: 'center',    //alinha o texto
        justifyContent: 'center', //alinha o texto
        borderWidth: 2,
        borderColor: '#b98921ff'
    },
    espacoBtn: {

    },

    txtEntrar: {
        color: '#fff',
        fontSize: 19,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    img: {
        ...StyleSheet.absoluteFillObject, // esse estilo ocupa a tela toda
        width: width,
        height: height
    },

})