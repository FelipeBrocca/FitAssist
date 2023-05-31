import React, { useState, useCallback } from 'react'
import LoginForm from './LoginForm'
import { View, StyleSheet, Dimensions } from 'react-native'


const { width, height } = Dimensions.get('window')

const LoginService = ({ navigation }) => {

  const [errors, setErrors] = useState('')
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const manageInputs = useCallback((name, value) => {
    setValues({ ...values, [name]: value });
  }, [setValues, values]);


  const handleSubmit = () => {
    if (!values.email) {
      setErrors('Ingrese un email')
    } else if (!values.password){
      setErrors('Ingrese una contraseña')
    } else {
      setErrors('')
      console.log(values);
    }
  }

  return (
    <View style={[styles.container]}>
      <LoginForm 
      manageInputs={manageInputs} 
      navigation={navigation}
      handleSubmit={handleSubmit}
      errors={errors}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: height,
    width: width,
    backgroundColor: '#363435',
    paddingTop: 20
  }
})

export default LoginService