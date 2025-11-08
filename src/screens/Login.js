import React, { useState } from 'react';
import { ScrollView, View, Alert, Text, Image, Button, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Dimensions, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
// import StylesBF from '../componentes/botoesPadrao';
const { width, height } = Dimensions.get('screen');

function LoginScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');

    function funcaoLogin() {
        if (!senha || !email) {
            Alert.alert('Erro', 'Preencha todos os campos ')
            return;
        }
        signInWithEmailAndPassword(auth, email, senha)
            .then(() => {
                navigation.navigate('CompletarDados');


            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('Este email já está em uso!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('Email inválido!');
                }

                console.error(error);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1 }} >

            <View style={{ height: height, width: width, backgroundColor: 'blue', justifyContent: 'flex-end', alignItems: 'center' }} >
                <Image style={Styles.img}
                    source={require('../../assets/imagemTelaInicial.jpg')}
                    resizeMode='cover'
                />
                <KeyboardAvoidingView
                    enabled={true}
                    behavior="height"
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'center',    // nunca na vida esquecer que tem que colocar isso no scrollview!!!!!
                                alignItems: 'center'
                            }}
                        >

                            <View style={Styles.ViewTextInput}>
                                <Text style={Styles.txtQuestion}>* Digite seus dados de acesso:</Text>

                                <TextInput style={Styles.TextInput}
                                    placeholder='Digite seu Email...'
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <TextInput style={Styles.TextInput}
                                    placeholder='Digite sua senha...'
                                    secureTextEntry={!showPassword}
                                    autoCapitalize='none'
                                    value={senha}
                                    onChangeText={setSenha}
                                />

                                <TouchableOpacity style={{ flexDirection: 'row' }} title='icone' onPress={() => setShowPassword(!showPassword)}>
                                    <Text style={Styles.txtQuestion2}> Ver a senha  </Text>
                                    <Ionicons
                                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                        size={25}
                                        color="#ffffffff"
                                        alignSelf='flex-end'

                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity title='Acessar' style={Styles.btnEntrar} onPress={funcaoLogin}>
                                <View style={Styles.espacoBtn}>
                                    <Text style={Styles.txtEntrar}>Entrar</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity title='Cadastro' style={Styles.btnEntrarBaixo}
                                onPress={() => navigation.navigate('Cadastro')}>
                                <View style={Styles.espacoBtn}>
                                    <Text style={Styles.txtEntrar}>Cadastrar</Text>
                                </View>
                            </TouchableOpacity>






                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>


    )


}
const Styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',

    },
    btnEntrar: {
        height: 60,
        width: 200,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 25,
        marginBottom: 3,
        alignItems: 'center',    //alinha o texto
        justifyContent: 'center', //alinha o texto
        borderWidth: 2,
        borderColor: '#b98921ff',
        opacity: 0.87
    },
    btnEntrarBaixo: {
        height: 60,
        width: 200,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 25,
        marginBottom: 1,
        alignItems: 'center',    //alinha o texto
        justifyContent: 'center', //alinha o texto
        borderWidth: 2,
        borderColor: '#b98921ff',
        opacity: 0.87
    },
    espacoBtn: {

    },
    txtQuestion: {
        color: '#ffffffff',
        fontSize: 16,
        alignSelf: 'flex-start',
        fontStyle: 'italic',
        fontWeight: '',
        marginRight: 30
    },
    txtEntrar: {

        color: '#fff',
        fontSize: 19,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    TextInput: {
        width: 270,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'gold',
        marginBottom: 4,

    },
    ViewTextInput: {



    },
    img: {
        ...StyleSheet.absoluteFillObject, // esse estilo ocupa a tela toda
        width: width,
        height: height
    },
    txtQuestion2: {
        color: '#ffffffff',
        fontSize: 16,
        alignSelf: 'flex-start',
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginLeft: 0
    },




})
export default LoginScreen;