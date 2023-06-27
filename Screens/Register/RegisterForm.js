import React from 'react'
import { Image, StyleSheet, TextInput, Switch, Text, View, TouchableOpacity, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')


const RegisterForm = ({ manageInputs, toggleSwitch, toggleValue, navigation, errors, handleSubmit }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo-claro.png')} />

      <TextInput
        placeholder='Email'
        keyboardType='email-address'
        style={styles.input}
        onChangeText={(value) => manageInputs('email', value.toLowerCase())}
      />

      <TextInput
        placeholder='Nombre'
        style={styles.input}
        onChangeText={(value) => manageInputs('username', value)}
      />

      <TextInput
        placeholder='Contraseña'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value) => manageInputs('password', value)}
      />

      <TextInput
        placeholder='Repetir contraseña'
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(value) => manageInputs('confirmPassword', value)}
      />

      <View style={styles.isCoachSwitchContainer}>
        <Text style={styles.isCoachSwitchTitle}>Sos entrenador?</Text>
        <Switch
          trackColor={{ false: '#FE6816', true: '#00CAA6' }}
          onValueChange={() => toggleSwitch()}
          value={toggleValue}
        />
      </View>

      <View>
        <Text style={styles.errors}>{errors ? errors : ''}</Text>
      </View>

      <TouchableOpacity onPress={() => handleSubmit()} title='registrarse' style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Ya estás registrado?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Ingresar</Text>
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
    maxWidth: 400,
    height: height
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
    maxWidth: 100,
    maxHeight: 100
  },
  loginContainer: {
    width: '100%',
    gap: 5,
    alignItems: 'flex-end'
  },
  loginTitle: {
    color: 'whitesmoke'
  },
  loginLink: {
    fontSize: 16,
    color: '#00CAA6'
  },
  isCoachSwitchContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  isCoachSwitchTitle: {
    color: 'whitesmoke',
    fontSize: 20
  },
  errors: {
    color: 'red'
  }
})

export default RegisterForm