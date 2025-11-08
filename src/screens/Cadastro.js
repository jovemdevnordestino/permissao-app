import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput, StatusBar, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('screen');

function Cadastro() {


  const navigation = useNavigation();
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const funcaoLogin = async () => {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert('ERRO', 'Preencha todos os campos');
      return;
    } else if (senha.length < 6) {
      Alert.alert('ERRO', 'A senha deve ter, no mínimo, 6 dígitos.');
      return;
    } else if (senha !== confirmarSenha) {
      Alert.alert('ERRO', 'As senhas não coincidem.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha)

      const user = userCredential.user;
      console.log('Usuário cadastrado com sucesso:', user.uid);

      navigation.navigate('CompletarDados');
      Alert.alert('Sucesso', 'Usuário criado! Bem-vindo(a)!');
      const storeData = async (key, value) => {
        try {
          if (!key || !value) {
            console.error("Chave ou valor inválido para AsyncStorage");
            return;
          }
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(key, jsonValue);
          console.log("Salvando uid:", value, "em", key);
        } catch (e) {
          console.error("Erro ao salvar dados:", e);
        }
      };
      storeData('tokenAutenticacao', user.uid);
    } catch (erro) {
      let mensagemErro = 'Ocorreu um erro desconhecido no cadastro.';
      if (erro.code === 'auth/invalid-email') {
        mensagemErro = 'Email inválido. Verifique o formato.';
      } else if (erro.code === 'auth/email-already-in-use') {
        mensagemErro = 'Este email já está cadastrado.';
      }
      console.log('Erro no cadastro:', erro.code, erro.message);
      Alert.alert('ERRO no Cadastro', mensagemErro);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style='light' backgroundColor='#000000ff' />
      <Image
        style={Styles.img}
        source={require('../../assets/imagemTelaInicial.jpg')}
        resizeMode="cover"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 40,
            }}
          >
            <View style={{ backgroundColor: 'rgba(0, 0, 255, 0)', padding: 20 }}>
              <Text style={Styles.txtQuestion}>* Crie seus dados de acesso:</Text>

              <View style={Styles.ViewTextInput}>
                <TextInput
                  style={Styles.TextInput}
                  placeholder="Digite seu Email..."
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
                  keyboardType="email-address"
                />

                <TextInput
                  style={Styles.TextInput}
                  placeholder="Digite sua senha..."
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                  onChangeText={setSenha}
                  value={senha}
                />

                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={Styles.txtQuestion2}>Ver a senha</Text>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={25}
                    color="#ffffff"
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>

                <Text style={Styles.txtQuestion1}>* Confirme a sua senha:</Text>
                <TextInput
                  style={Styles.TextInput}
                  placeholder="Confirme sua senha..."
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                  onChangeText={setConfirmarSenha}
                  value={confirmarSenha}
                />
              </View>

              <TouchableOpacity style={Styles.btnEntrarBaixo} onPress={funcaoLogin}>
                <Text style={Styles.txtEntrar}>Novo Cadastro</Text>
              </TouchableOpacity>

              <View style={Styles.areaLogin}>
                <Text style={Styles.txtJaTemConta}>Já tem uma conta?</Text>
                <TouchableOpacity
                  style={Styles.btnVoltarLogin}
                  onPress={() => navigation.navigate('TelaLogin')}
                >
                  <Text style={Styles.txtVoltarLogin}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  btnVoltarLogin: {
    height: 40,
    width: 90,
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#b98921ff',
    opacity: 0.87,
    marginLeft: 10,
  },
  btnEntrarBaixo: {
    height: 60,
    width: 200,
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#b98921ff',
    opacity: 0.87,
    marginVertical: 10,
  },
  txtQuestion: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  txtQuestion1: {
    color: '#fff',
    fontSize: 14,
    alignSelf: 'flex-start',
    fontStyle: 'italic',
    marginTop: 10,
  },
  txtQuestion2: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  txtEntrar: {
    color: '#fff',
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtVoltarLogin: {
    color: '#b98921ff',
    fontSize: 16,
  },
  txtJaTemConta: {
    fontSize: 16,
    color: '#ceccc6ff',
    fontStyle: 'italic',
  },
  ViewTextInput: {
    alignItems: 'center',
  },
  TextInput: {
    width: 270,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'gold',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
  },
  areaLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default Cadastro;
