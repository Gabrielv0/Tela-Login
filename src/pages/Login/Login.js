import React from 'react';

import {
  Dimensions,
  StatusBar,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Animated,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  Modal
} from 'react-native';

import { useState, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons'

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import imagem from '../../../assets/logo.png'

export function Login({ navigation }) {

  const [inputEmail, setInputEmail] = useState('')

  const [inputPassword, setInputPassword] = useState('')

  const [showPassword, setShowPassoword] = useState(true)

  const [modalVisible, setModalVisible] = useState(false)

  const [emailModal, setEmailModal] = useState('');

  const [errorMessage, setErrorMessage] = useState({
    id: "",
    mensagem: ""
  })



  function validateLogin() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const senhaRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (!inputEmail) {
      setErrorMessage({
        id: 1,
        mensagem: 'Digite seu e-mail'
      })
    }
    else if (!emailRegex.test(inputEmail)) {
      setErrorMessage({
        id: 2,
        mensagem: 'Digite um email válido'
      })
    }
    else if (!inputPassword) {
      setErrorMessage({
        id: 3,
        mensagem: 'Digite sua senha'
      })
    }
    else if (!senhaRegex.test(inputPassword)) {
      setErrorMessage({
        id: 4,
        mensagem: 'Digite uma senha contendo no min 8 caracteres'
      })
    }
    else {
      fetch(API + '/users?cpf=' + inputEmail + '&password=' + inputPassword)
        .then(async (response) => {
          const data = await response.json()
          if (data.length === 1) {
            await AsyncStorage.setItem('@id_user', JSON.stringify(data[0].id))
            navigation.navigate('User')
          } else {
            alert('Usuário não cadastrado')
          }
        })
        .catch(() => alert('Houve um erro ao tentar logar.'))
    }
  }

  function erro(mensagem) {
    return (
      <View style={styles.viewDeErro}>
        <Text style={styles.textoDeErro}>{mensagem}</Text>
      </View>
    )
  }

  function navigateForSignUp() {
    navigation.navigate('SignUp')
  }

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
  const [logo] = useState(new Animated.ValueXY({ x: 150, y: 150 }))

  useEffect(() => {

    keybordDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keybordDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.spring(offset.y, {
      toValue: 0,
      speed: 5,
      bounciness: 10,
      useNativeDriver: true
    }).start();
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(logo.x, {
        toValue: 150,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 150,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(logo.x, {
        toValue: 150,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  }

  return (
    <SafeAreaView style={styles.background}>

      <StatusBar backgroundColor={"#7353BA"} />

      
      <View style={styles.logo}>
        <Animated.Image
          source={require('../../../assets/logo.png')}
          style={{ height: logo.y, width: logo.x }}
        />
      </View>

        <Animated.View
          style={[styles.container,
          {
            transform: [
              { translateY: offset.y }
            ]
          }
          ]}>

          <View style={styles.abasView}>

            <View style={styles.signUpAba} >
              <Text style={styles.textoSignUp}>Login</Text>
            </View>

            <TouchableOpacity style={styles.loginAba} onPress={navigateForSignUp}>
              <Text style={styles.textoLogin}>Sign-up</Text>
            </TouchableOpacity>

          </View>

          {errorMessage.id === 1 && erro(errorMessage.mensagem)}
          {errorMessage.id === 2 && erro(errorMessage.mensagem)}

          <TextInput
            style={styles.input}
            placeholder='Email'
            value={inputEmail}
            onChangeText={setInputEmail}
          />

          {errorMessage.id === 3 && erro(errorMessage.mensagem)}
          {errorMessage.id === 4 && erro(errorMessage.mensagem)}

          <View style={styles.inputArea}>
            <TextInput
              style={styles.inputSenha}
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
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <Modal visible={modalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Esqueci minha senha</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text>Por favor digite o email que voce deseja recuperar a senha.</Text>
              <View style={styles.modalBody}>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Digite seu email"
                  onChangeText={text => setEmailModal(text)}
                  value={emailModal}
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => console.log(`Solicitação de redefinição de senha para ${email}`)}
                >
                  <Text style={styles.modalButtonText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.containerBotao}>
            <TouchableOpacity onPress={validateLogin} style={styles.botao}><Text style={styles.textoBotao} onPress={validateLogin}>Logar</Text></TouchableOpacity>
            <TouchableOpacity onPress={navigateForSignUp} style={styles.texto} ><Text>Abrir conta gratuita</Text></TouchableOpacity>
          </View>



        </Animated.View>
      
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: '#2F195F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Problema é no container

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },

  containerBotao: {
    display: "flex",
    width: "100%",
    flexDirection: 'column',
    alignItems: "center",



  },
  senha: {
    width: '70%',
    height: 50,
    padding: 8,
    fontSize: 18,
    backgroundColor: '#FFF',
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 10
  },

  abasView: {

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    alignSelf: "center",
    height: 45,
    marginTop: 10,
    marginBottom: 15,
    marginRight: 15

  },

  containerSenha: {
    display: "flex",
    width: "90%",
    flexDirection: 'row',
    alignItems: "center",


  },

  botao: {

    width: "80%",
    height: 50,
    backgroundColor: "#7353BA",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    alignSelf: "center",
  },

  texto: {
    marginTop: 10,
    fontSize: 18,
    color: "#F1F1F1"
  },
  textoBotao: {

    fontSize: 18,
    color: "#F1F1F1"
  },

  icone: {
    height: Dimensions.get("window").width / 2.5,
    width: "45%",
    margin: 10,
    justifyContent: "center",
    alignSelf: "center"

  },

  iconeContainer:
  {
    backgroundColor: "white",
    width: "100%",
    alignSelf: "center",
    borderRadius: 15,
  },

  input:
  {
    width: "80%",
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#7353BA",
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 10,
    alignSelf: "center",
    color: "#0F1020"
  },

  inputArea: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    textAlign: 'left',
    borderRadius: 10,
    color: 'black',
    fontSize: 15,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  inputSenha: {
    width: '85%',
    height: 50,
    padding: 8,
    fontSize: 18
  },

  loginAba: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },

  signUpAba:
  {
    borderBottomWidth: 2,
    borderBottomColor: "#7353BA",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",

  },

  textoDeErro:
  {
    fontSize: 18,
    color: "red"
  },

  textoEscuro:
  {
    color: "#7353BA",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: "10%",
    marginTop: 10,
  },

  textoLogin:
  {
    fontSize: 22,
    color: "#7353BA",
    margin: 5,

  },

  textoSignUp:
  {
    fontSize: 22,
    color: "#7353BA",
    margin: 5

  },

  viewDeErro: {
    flexDirection: "row",
    width: "80%",
    marginHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 5,

  },
  background: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',

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
  },
  textoDeErro:
  {
    fontSize: 15,
    color: "red"
  },
  viewDeErro: {
    flexDirection: "row",
    width: "90%",
    marginHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 5
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#7353BA',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

})