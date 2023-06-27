import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, View } from 'react-native'


import AuthGlobal from '../../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../../assets/common/baseUrl';
import axios from 'axios';

const { width, height } = Dimensions.get('window')

const FormEnvCreate = ({ navigation }) => {

  const context = useContext(AuthGlobal)
  const initialValues = {
    name: '',
    mainPlace: ''
  }
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState('')
  const [token, setToken] = useState(null)
  const nameRef = useRef()
  const mainPlaceRef = useRef()

  useEffect(() => {
    AsyncStorage.getItem('fTjAsWiT')
      .then((res) => {
        setToken(res)
      })
  }, [])

  const manageInputs = (name, value) => {
    setValues({ ...values, [name]: value });
  }

  const resetForm = () => {
    setValues(initialValues)
    nameRef.current.clear()
    mainPlaceRef.current.clear()
    setError('')
  }

  const handleSubmit = () => {
    if (!values.name || !values.mainPlace) {
      setError("Complete todos los campos")
    } else if (!context.stateUser.user.userId) {
      setError("No está habilitado para crear grupo")
    } else {
      let newEnvironment = {
        name: values.name,
        mainPlace: values.mainPlace,
        coach: context.stateUser.user.userId,
        clients: [],
        trainings: [],
        rating: 0
      }

      axios
        .post(`${baseUrl}/environments`, newEnvironment, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          const id = res.data._id
          if (res.status === 201) {
            axios
              .get(`${baseUrl}/users/${context.stateUser.user.userId}`, {
                headers: { Authorization: `Bearer ${token}` }
              })
              .then(res => {
                const userData = res.data;
                userData.environment.push(id)
                axios
                  .put(`${baseUrl}/users/${context.stateUser.user.userId}`, userData, {
                    headers: { Authorization: `Bearer ${token}` }
                  })
                  .then((res) => {
                    if (res.status === 201) {
                      resetForm()
                      setTimeout(() => {
                        navigation.navigate("Home")
                      }, 300)
                    }
                  })
                  .catch((err) => console.log(err))
              })
              .catch((err) => console.log(err))
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Crear grupo
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Nombre del grupo'
        ref={nameRef}
        onChangeText={(value) => manageInputs('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder='Lugar predeterminado'
        ref={mainPlaceRef}
        onChangeText={(value) => manageInputs('mainPlace', value)}
      />
      <View>
        <Text style={styles.errors}>{error ? error : ''}</Text>
      </View>
      <View style={styles.buttonsCont}>
        <TouchableOpacity onPress={() => resetForm()} style={styles.cancel}>
          <Text style={styles.buttText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.confirm}>
          <Text style={styles.buttText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#363435',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    height: height
  },
  title: {
    width: width,
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 22,
    color: 'whitesmoke'
  },
  input: {
    width: '80%',
    height: 38,
    backgroundColor: 'whitesmoke',
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 5
  },
  buttonsCont: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cancel: {
    padding: 10,
    backgroundColor: '#FE6816',
    alignItems: 'center',
    borderRadius: 5
  },
  confirm: {
    padding: 10,
    backgroundColor: '#00CAA6',
    alignItems: 'center',
    borderRadius: 5
  },
  buttText: {
    color: 'whitesmoke',
    fontWeight: 800
  },
  errors: {
    color: 'red'
  }
})

export default FormEnvCreate