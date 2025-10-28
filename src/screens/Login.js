import React from 'react';
import {View, Text, Image,Button,StyleSheet,TouchableOpacity, Dimensions, TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
// import StylesBF from '../componentes/botoesPadrao';
const {width,height} = Dimensions.get('window');
function LoginScreen (){
 return(
 <SafeAreaView style={{ flex:1 }} >

  <View style={Styles.view} >  
    
     <View style={{height:500,width:width, backgroundColor:'blue',justifyContent:'flex-end',alignItems:'center'}}>
         <Image style={Styles.img} 
                source={require('../../assets/imagemTelaInicial.jpg')}
                resizeMode='cover'
                />
                <Text style={Styles.txtQuestion}>* Digite seus dados de acesso:</Text> 
        <View style={Styles.ViewTextInput}>
        <TextInput style={Styles.TextInput} 
        placeholder='Digite seu Email...'
        
        /> 
        <TextInput style={Styles.TextInput} 
        placeholder='Digite sua senha...'
        
        /> 
         
      
         </View> 
          </View> 
                     
           <TouchableOpacity title='Acessar'   style={Styles.btnEntrar}>
                     <View style={Styles.espacoBtn}>
                        <Text style={Styles.txtEntrar}>Entrar</Text>
                      </View>
                  </TouchableOpacity>
                 <TouchableOpacity title='Acessar'   style={Styles.btnEntrarBaixo}>
                     <View style={Styles.espacoBtn}>
                        <Text style={Styles.txtEntrar}>Cadastrar</Text>
                      </View>
                  </TouchableOpacity>
                  


  </View>
 </SafeAreaView>


 )


}
const Styles = StyleSheet.create({
view:{
    flex:1,
    backgroundColor: '#fff',
  
    },
btnEntrar:{
height:60,
width:200,
backgroundColor:'black',
alignSelf:'center',
borderRadius:25,
marginBottom:3,
alignItems:'center',    //alinha o texto
justifyContent:'center', //alinha o texto
borderWidth:2,
borderColor:'#b98921ff',
opacity:0.87
},
btnEntrarBaixo:{
height:60,
width:200,
backgroundColor:'black',
alignSelf:'center',
borderRadius:25,
marginBottom:1,
alignItems:'center',    //alinha o texto
justifyContent:'center', //alinha o texto
borderWidth:2,
borderColor:'#b98921ff',
opacity:0.87
},
espacoBtn:{

},   
txtQuestion:{
color: '#ffffffff',
fontSize:16,
alignSelf:'flex-start',
fontStyle:'italic',
fontWeight:'',
marginLeft:50
},
txtEntrar:{
    
color: '#fff',
fontSize:19,
textAlign:'center',
fontWeight:'bold'
},
TextInput:{
width:270,
height:50,
backgroundColor:'#fff',
borderRadius:7,
borderWidth:1,
borderColor:'gold',
marginBottom:4,

},
ViewTextInput:{



},
img:{
...StyleSheet.absoluteFillObject, // esse estilo ocupa a tela toda
width: width,
height: height
},




})
export default LoginScreen;