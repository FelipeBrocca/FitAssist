import React, { useState, useCallback, useEffect, useContext } from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import RegisterForm from './RegisterForm'


import baseUrl from '../../common/baseUrl';
import axios from 'axios'
import AuthGlobal from '../../Context/store/AuthGlobal';

const { width } = Dimensions.get('window')

const RegisterService = ({ navigation }) => {

  const context = useContext(AuthGlobal)
  const [errors, setErrors] = useState('')
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    isCoach: false
  })

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate('Home')
    }
  }, [context.stateUser.isAuthenticated])

  const manageInputs = useCallback((name, value) => {
    setValues({ ...values, [name]: value });
  }, [setValues, values]);

  const toggleSwitch = useCallback(() => {
    setValues(prev => ({ ...prev, isCoach: !prev.isCoach }))
  })

  const handleSubmit = () => {
    if (!values.email || !values.password || !values.confirmPassword || !values.username) {
      setErrors('Complete todos los campos')
    } else if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      setErrors('Las contraseñas no coinciden')
    } else {

      let user = {
        email: values.email,
        name: values.username,
        isCoach: values.isCoach,
        password: values.password
      }

      axios
        .post(`${baseUrl}/users`, user)
        .then((res) => {
          if (res.status === 201) {
            setTimeout(() => {
              navigation.navigate("Login");
            }, 300);
            setErrors("");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setErrors('Email ya registrado');
          } else {
            console.log(err);
          }
        });
    }
  }

  return (
    <View style={[styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <RegisterForm
          manageInputs={manageInputs}
          toggleSwitch={toggleSwitch}
          navigation={navigation}
          toggleValue={values.isCoach}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#363435',
    width: width,
    flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30
  }
})
export default RegisterService