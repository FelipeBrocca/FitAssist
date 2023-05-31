import React, { useState } from 'react'
import { Image, View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

const LoginForm = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const manageInputs = (name, value) => {
      setValues({...values, [name]: value})
      console.log(values);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo-claro.png')} />

            <TextInput
                placeholder='Email'
                keyboardType='email-address'
                style={styles.input}
                onChangeText={(value) => manageInputs('email', value)}
            ></TextInput>

            <TextInput
                placeholder='Contraseña'
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(value) => manageInputs('password', value)}
            ></TextInput>

            <TouchableOpacity title='Ingresar' style={styles.button}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 20,
        gap: 20
    },
    input: {
        width: '90%',
        height: 38,
        backgroundColor: 'whitesmoke',
        borderWidth: 0.3,
        borderColor: 'grey',
        borderRadius: 8,
        padding: 5
    },
    button: {
        backgroundColor: '#FE6816',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 10,
        border: 0
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    logo: {
        width: '80%',
        height: '80%',
        maxWidth: 200,
        maxHeight: 200
    }
})
export default LoginForm