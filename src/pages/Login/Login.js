import React from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View, 
  SafeAreaView, 
  Animated,
  Text, 
  TouchableOpacity,
  Keyboard 
  } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native';
import Logo from '../../../assets/logo.png'


export function Login({navigation}) {

    const [inputEmail, setInputEmail] = useState('');

    const [inputPassword, setInputPassword] = useState('')
  
    const [showPassword, setShowPassoword] = useState(true)
  
    const [errorMessage, setErrorMessage] = useState('')

    function validateLogin(){
        if(!inputEmail){
          setErrorMessage('Digite seu e-mail')
        }
        else if(!inputPassword){
          setErrorMessage('Digite sua senha')
        } else{
          fetch(API + '/users?cpf=' + inputEmail + '&password=' + inputPassword)
          .then(async(response) => {
            const data = await response.json()
            if(data.length === 1) {
              await AsyncStorage.setItem('@id_user',JSON.stringify(data[0].id))
              navigation.navigate('User')
            } else {
              alert('Usuário não cadastrado')
            }        
          })
          .catch(() => alert('Houve um erro ao tentar logar.'))
        }
      }

      function navigateForSignUp() {
        navigation.navigate('SignUp')
      }

      const [offset] = useState(new Animated.ValueXY({x: 0, y: 90}));
      const [logo] = useState(new Animated.ValueXY({x: 300, y:300}))

      useEffect(()=> {

        keybordDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        keybordDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
        
        Animated.spring(offset.y, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: true
        }).start();
      }, []);

      function keyboardDidShow()
      {
        Animated.parallel([
        Animated.timing(logo.x, {
          toValue: 100,
          duration: 100,
          useNativeDriver: false
        }),
        Animated.timing(logo.x, {
          toValue: 300,
          duration: 100,
          useNativeDriver: false
        })    
        ]).start();
      }

      function keyboardDidHide()
      {
        Animated.parallel([
          Animated.timing(logo.x, {
            toValue: 300,
            duration: 100,
            useNativeDriver: false
          }),
          Animated.timing(logo.x, {
            toValue: 300,
            duration: 300,
            useNativeDriver: false
          })    
          ]).start();
      }

    return (
        
    <SafeAreaView style={styles.background}> 
         
     <View style={styles.logo}>
     <Animated.Image
      source={require('../../../assets/logo.png')} 
      style={{height: logo.y, width: logo.x}}
    /> 
      </View> 

      <Animated.View 
      style={[styles.container,
      {
        transform: [
          {translateY: offset.y }
        ]
      } 
      ]}
      >
        <TextInput
          style={styles.input}
          placeholder='Email'
          keyboardType='number-pad'
          value={inputEmail}
          onChangeText={setInputEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder='Senha'
          secureTextEntry={showPassword}
          value={inputPassword}
          onChangeText={(password) => setInputPassword(password)}
        />
        <TouchableOpacity style={styles.icon} onPress={() => setShowPassoword(!showPassword)}>
          {showPassword ?
            <Ionicons name='eye' color='black' size={25} />
            :
            <Ionicons name='eye-off' color='black' size={25} />
          }
        </TouchableOpacity>
        
      <TouchableOpacity onPress={navigateForSignUp}><Text>Esqueceu sua senha?</Text></TouchableOpacity>
      <TouchableOpacity onPress={validateLogin} style={styles.button}><Text style={{fontSize: 15}} onPress={validateLogin}>Logar</Text></TouchableOpacity>
      <TouchableOpacity onPress={navigateForSignUp}><Text>Abrir conta gratuita</Text></TouchableOpacity>
          
     
      {
        errorMessage!== '' && (
          <View>
            <Text>{errorMessage}</Text>
          </View>
        )        
      }

</Animated.View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: '#2F195F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {    
   flex: 1, 
   justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'

  },
  input: {
    width: '90%',
    height: 50,
    padding: 8,
    fontSize: 18, 
    backgroundColor: '#FFF',
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 10   
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }
});