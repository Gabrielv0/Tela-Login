import { Dimensions, SafeAreaView, StatusBar, StyleSheet, TextInput, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from "react";
import imagem from '../../../assets/logo.png'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


    function SignUp({navigation}) {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [idade, setIdade] = useState("")
    const [CPF, setCPF] = useState("")
    const [senha, setSenha] = useState("")
    const [mensagemDeErro, setMensagemDeErro] = useState({
        id: "",
        mensagem: ""
    })

    function validarRegistro() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const nomeRegex = /^[a-zA-Z ]{3,}$/
        const senhaRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/
        const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

        if (!nomeRegex.test(nome)) {
            setMensagemDeErro({
                id: 1,
                mensagem: "Insira um nome com no mínimo 3 caracteres alfabéticos!"
            })
        }
        else if (!emailRegex.test(email)) {
            setMensagemDeErro({
                id: 2,
                mensagem: "E-mail inválido!"
            })
        }
        else if (idade < 18) {
            setMensagemDeErro({
                id: 3,
                mensagem: "Para se cadastrar, você deve ter mais do que 18 anos!"
            })
        }
        else if (!cpfRegex.test(CPF)) {
            setMensagemDeErro({
                id: 4,
                mensagem: "Insira um CPF válido!"
            })
        }

        else if (!senhaRegex.test(senha)) {
            setMensagemDeErro({
                id: 5,
                mensagem: "Sua senha deve conter pelo menos 8 dígitos!"
            })
        }


        else {
            //chamar função com o fetch para enviar dados
            setMensagemDeErro({
                id: "",
                mensagem: ""
            })
            alert("Dados corretos para efetuar o cadastro!")
        }

    }

    function erro(mensagem) {
        return (
            <View style={styles.viewDeErro}>
                <Icon name="alert-circle-outline" size={26} color="red" style={{ alignSelf: "flex-start" }} />
                <Text style={styles.textoDeErro}>{mensagem}</Text>
            </View>
        )
    }

    function navigateForLogin() {
        navigation.navigate('Login')
      }



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#7353BA"} />
            <ScrollView style={{ flex: 1, width: "100%" }}>
                <View style={styles.iconeContainer}>
                    <Image source={imagem} style={styles.icone} />
                </View>
                <View style={styles.abasView}>
                    <TouchableOpacity style={styles.loginAba} onPress={navigateForLogin}>
                        <Text style={styles.textoLogin}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpAba}>
                        <Text style={styles.textoSignUp}>Sign-up</Text>
                    </View>
                </View>

                <Text style={styles.textoEscuro}>Nome</Text>
                <TextInput
                    style={styles.input}
                    selectionColor="#7353BA"
                    maxLength={120}
                    value={nome}
                    onChangeText={setNome}
                />
                {mensagemDeErro.id === 1 && erro(mensagemDeErro.mensagem)}

                <Text style={styles.textoEscuro}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    selectionColor="#7353BA"
                    keyboardType="email-address"
                    maxLength={30}
                    value={email}
                    onChangeText={setEmail}
                />
                {mensagemDeErro.id === 2 && erro(mensagemDeErro.mensagem)}

                <Text style={styles.textoEscuro}>Idade</Text>
                <TextInput
                    style={styles.input}
                    selectionColor="#7353BA"
                    keyboardType="number-pad"
                    maxLength={3}
                    value={idade}
                    onChangeText={setIdade}
                />
                {mensagemDeErro.id === 3 && erro(mensagemDeErro.mensagem)}

                <Text style={styles.textoEscuro}>CPF</Text>
                <TextInput
                    style={styles.input}
                    selectionColor="#7353BA"
                    keyboardType="number-pad"
                    maxLength={14}
                    value={CPF}
                    onChangeText={setCPF}
                />
                {mensagemDeErro.id === 4 && erro(mensagemDeErro.mensagem)}

                <Text style={styles.textoEscuro}>Senha</Text>
                <TextInput
                    style={styles.input}
                    selectionColor="#7353BA"
                    secureTextEntry
                    maxLength={40}
                    value={senha}
                    onChangeText={setSenha}
                />
                {mensagemDeErro.id === 5 && erro(mensagemDeErro.mensagem)}

                <TouchableOpacity style={styles.botaoFotoPerfil} onPress={() => { }}>
                    <Text style={styles.textoBotaoFotoPerfil}>Foto do perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoCadastrar} onPress={validarRegistro}>
                    <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    abasView:
    {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "80%",
        alignSelf: "center",
        height: 45,
        marginTop: 10,
        marginBottom: 15,
        marginRight: 15

    },

    botaoCadastrar:
    {
        width: "80%",
        height: 50,
        backgroundColor: "#7353BA",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        alignSelf: "center",
    },

    botaoFotoPerfil:
    {
        width: "50%",
        height: 50,
        backgroundColor: "#7353BA",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        alignSelf: "center",
        opacity: 0.7
    },

    container:
    {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F1F1F1",
        paddingVertical: 20,
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
        width: "90%",
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

    textoBotaoCadastrar:
    {
        fontSize: 25,
        color: "#F1F1F1"
    },

    textoBotaoFotoPerfil:
    {
        fontSize: 25,
        color: "#F1F1F1"
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


})

export default SignUp;