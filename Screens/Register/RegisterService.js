import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import RegisterForm from './RegisterForm'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

const RegisterService = ({ navigation }) => {

  const [errors, setErrors] = useState('')
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    isCoach: false
  })

  const manageInputs = useCallback((name, value) => {
    setValues({ ...values, [name]: value });
  }, [setValues, values]);

  const toggleSwitch = useCallback(() => {
    setValues(prev => ({ ...prev, isCoach: !prev.isCoach }))
  })

  const handleSubmit = () => {
    if (!values.email || !values.password || !values.confirmPassword || !values.username) {
      setErrors('Complete todos los campos')
    } else if (values.password && values.confirmPassword && values.password !== values.confirmPassword){
      setErrors('Las contraseñas no coinciden')
    } else {
      setErrors('')
      console.log(values);
    }
  }

  return (
    <SafeAreaView style={[styles.container]}>
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
    </SafeAreaView>
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