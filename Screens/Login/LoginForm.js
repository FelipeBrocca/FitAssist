import React from 'react'
import { Image, View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

const LoginForm = ({ manageInputs, navigation, handleSubmit, errors, values }) => {

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo-claro.png')}
            />

            <TextInput
                placeholder='Email'
                keyboardType='email-address'
                style={styles.input}
                onChangeText={(value) => manageInputs('email', value)}
                value={values.email}
            ></TextInput>

            <TextInput
                placeholder='Contraseña'
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(value) => manageInputs('password', value)}
                value={values.password}
            ></TextInput>

            <View>
                <Text style={styles.errors}>{errors ? errors : ''}</Text>
            </View>

            <TouchableOpacity onPress={() => handleSubmit()} title='Ingresar' style={styles.button}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
                <Text style={styles.registerTitle}>No estás registrado aún?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerLink}>Registrate</Text>
                </TouchableOpacity>
            </View>
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
        gap: 20,
        maxWidth: 400
    },
    input: {
        width: '100%',
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
        maxWidth: 150,
        maxHeight: 150
    },
    registerContainer: {
        width: '100%',
        gap: 5,
        alignItems: 'flex-end'
    },
    registerTitle: {
        color: 'whitesmoke'
    },
    registerLink: {
        fontSize: 16,
        color: '#00CAA6'
    },
    errors: {
        color: 'red'
    }
})
export default LoginForm

