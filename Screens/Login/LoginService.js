import React, { useState, useCallback, useContext, useEffect } from 'react'
import LoginForm from './LoginForm'
import { ScrollView, StyleSheet, Dimensions, SafeAreaView } from 'react-native'


//Context
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

const { width, height } = Dimensions.get('window')

const LoginService = ({ navigation }) => {

  const context = useContext(AuthGlobal)
  const [errors, setErrors] = useState('')
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate('Home')
    }
  }, [context.stateUser.isAuthenticated])

  const manageInputs = useCallback((name, value) => {
    setValues({ ...values, [name]: value });
  }, [setValues, values]);

  const resetForm = () => {
    setValues({ email: '', password: '' })
  }

  const handleSubmit = () => {
    if (!values.email) {
      setErrors('Ingrese un email')
    } else if (!values.password) {
      setErrors('Ingrese una contraseña')
    } else {
      loginUser(values, context.dispatch)
      setErrors('')
    }
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <LoginForm
          manageInputs={manageInputs}
          navigation={navigation}
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
        />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width,
    backgroundColor: '#363435',
    paddingTop: 10
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    paddingVertical: 100
  }
})

export default LoginService