import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase'; // Sua configuração do Firestore

export default function CompletarDados() {
    // 1. USESTATE: Inicializa o estado dos dados do formulário e do UID do usuário
    const [dadosInst, setDadosInst] = useState({ 
        nome: '', 
        endereco: '', 
        numero: '' 
    });
    const [userId, setUserId] = useState(null); // Armazena o UID lido do AsyncStorage

    // --- FUNÇÕES DE LEITURA E ESCRITA ---

    // Função para ler o UID salvo no AsyncStorage
    const getData = async () => {
        try {
            // Assumimos que a chave 'tokenAutenticacao' contém o UID (como string)
            const uid = await AsyncStorage.getItem('tokenAutenticacao'); // Use a chave que definimos antes
            
            if (uid) {
                console.log('UID lido do AsyncStorage:', uid);
                setUserId(uid); // Atualiza o estado com o UID
            } else {
                console.log('UID não encontrado no AsyncStorage.');
            }
        } catch (e) {
            console.error('Erro ao acessar o AsyncStorage:', e);
        }
    };

    // Função para salvar os dados no Firestore
    const salvarDadosInstituicao = async () => {
        if (!userId) {
            Alert.alert('Erro', 'UID do usuário não encontrado. Tente logar novamente.');
            return;
        }

        const userDocRef = doc(db, 'instituicoes', userId); 

        try {
            await setDoc(userDocRef, {
                nome: dadosInst.nome,
                endereco: dadosInst.endereco,
                numeroTel: dadosInst.numero,
                dataCriacao: new Date().toISOString(),
            }, { merge: true });

            Alert.alert('Sucesso', 'Dados da instituição salvos!');
            
        } catch (error) {
            console.error('Erro ao salvar dados no Firestore:', error);
            Alert.alert('Erro', 'Não foi possível salvar os dados. Tente novamente.');
        }
    };

   
    useEffect(() => {
        getData();
    }, []);

    // Função auxiliar para atualizar qualquer campo do sub-objeto 'dadosInst'
    const handleInputChange = (field, value) => {
        setDadosInst(prevData => ({
            ...prevData, // Mantém os outros campos de estado (se houver)
            [field]: value, // Atualiza o campo específico (nome, endereco, numero)
        }));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.container} >
                <Text style={Styles.text}>Quase lá! Agora só falta preencher o formulário com os dados da instituição</Text>
                <Text style={Styles.txtSubtitle}>*Precisamos destes dados para saber se a instituição é real </Text>
                
                <View style={Styles.inputZone} >
        
                    <TextInput 
                        style={Styles.TextInput}
                        placeholder='Digite o nome da Instituição'
                        value={dadosInst.nome}
                        onChangeText={(text) => handleInputChange('nome', text)}
                    /> 

                    <TextInput 
                        style={Styles.TextInput}
                        placeholder='Digite o Endereço'
                        value={dadosInst.endereco}
                        onChangeText={(text) => handleInputChange('endereco', text)}
                    /> 

                    
                    <TextInput 
                        style={Styles.TextInput}
                        placeholder='Digite o Número de Telefone'
                        keyboardType='phone-pad'
                        value={dadosInst.numero}
                        onChangeText={(text) => handleInputChange('numero', text)}
                    /> 

                    <TouchableOpacity 
                        style={Styles.button} 
                        onPress={salvarDadosInstituicao}
                        disabled={!dadosInst.nome || !dadosInst.endereco || !dadosInst.numero}
                    >
                        <Text style={Styles.buttonText}>SALVAR DADOS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },
    text: {
        fontSize: 19,
        color: '#b98921ff',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 15
    },
    txtSubtitle: {
        color: '#000000ff',
        fontSize: 15,
        fontStyle: 'italic',
        margin: 10,
    },
    inputZone:{
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
    TextInput: {
        width: '80%', // Use porcentagem para melhor responsividade
        height: 50,
        backgroundColor: '#f6f6f6ff',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'gold',
        marginBottom: 4,
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: '#000000ff',
        padding: 15,
        borderRadius: 25,
        borderWidth:2,
        opacity: 0.87,
        borderColor:'#b98921ff',
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})