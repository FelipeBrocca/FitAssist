import React, { useState, useRef, useEffect, useContext } from 'react'
import { Text, StyleSheet, ScrollView, View, TextInput, Switch, Dimensions, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'

import AuthGlobal from '../../../Context/store/AuthGlobal';
import { useEnvironments } from '../../../Context/EnvContext';
import DeleteEnv from '../DeleteEnv/DeleteEnv';


const { width, height } = Dimensions.get('window')


const EditEnvForm = ({ navigation }) => {

  const route = useRoute()
  const { environment } = route.params
  const context = useContext(AuthGlobal)
  const { editEnv } = useEnvironments()
  const initialValues = {
    name: environment?.name,
    mainPlace: environment?.mainPlace,
    mainDays: environment?.mainDays,
    mainHours: {
      since: environment?.mainHours?.since,
      to: environment?.mainHours?.to
    }
  }
  const [deleteModal, setDeleteModal] = useState(false)
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState('')
  const [daySelected, setDayselected] = useState(environment?.mainDays)
  const nameRef = useRef()
  const mainPlaceRef = useRef()
  const days = [
    { name: 'Lunes', value: 1 },
    { name: 'Martes', value: 2 },
    { name: 'Miércoles', value: 3 },
    { name: 'Jueves', value: 4 },
    { name: 'Viernes', value: 5 },
    { name: 'Sábado', value: 6 },
    { name: 'Domingo', value: 7 },
  ]



  const manageInputs = (name, value) => {
    setValues({ ...values, [name]: value });
  }
  const manageHours = (name, value) => {
    setValues({
      ...values,
      mainHours: {
        ...values.mainHours,
        [name]: value
      }
    });
  }

  const toggleDay = (day) => {
    if (daySelected.includes(day)) {
      setDayselected(daySelected.filter((d) => d !== day))
    } else {
      setDayselected([...daySelected, day])
    }
  }

  const resetForm = () => {
    navigation.navigate('EnvProfile', { environment: environment })
  }

  const handleSubmit = () => {
    if (!values.name) {
      setError("Indique un nombre para el grupo")
    } else if (!context.stateUser.user.userId) {
      setError("No está habilitado para crear grupo")
    } else {
      let newEnvironment = {
        name: values.name,
        mainPlace: values.mainPlace,
        mainHours: {
          since: values?.mainHours?.since,
          to: values?.mainHours?.to
        },
        mainDays: daySelected,
        coach: context.stateUser.user.userId,
        clients: [],
        trainings: [],
        rating: 0
      }
      editEnv(environment._id, newEnvironment, navigation)
    }
  }


  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleCont}>
          <Text style={styles.title}>
            {environment?.name}
          </Text>
          <Icon
            name='trash-o'
            style={styles.iconTrash}
            onPress={() => setDeleteModal(true)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder='Nombre del grupo'
          ref={nameRef}
          value={values.name}
          onChangeText={(value) => manageInputs('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Lugar predeterminado'
          ref={mainPlaceRef}
          value={values.mainPlace}
          onChangeText={(value) => manageInputs('mainPlace', value)}
        />
        <View style={styles.daysCont}>
          {
            days.map((day) => (
              <View key={day.value} style={styles.dayCont}>
                <Text style={styles.dayName}>{day.name}</Text>
                <Switch
                  value={daySelected.includes(day.value)}
                  onValueChange={() => toggleDay(day.value)}
                  style={styles.daySwitch}
                />
              </View>
            ))
          }
        </View>
        <View style={styles.hoursCont}>
          <View style={styles.hourCont}>
            <Text style={styles.hourText}>Desde</Text>
            <TextInput
              style={styles.inputHour}
              value={values?.mainHours?.since}
              keyboardType='numeric'
              placeholder='hs.'
              onChangeText={(value) => manageHours('since', value)}
            />
          </View>
          <View style={styles.hourCont}>
            <Text style={styles.hourText}>Hasta</Text>
            <TextInput
              style={styles.inputHour}
              value={values?.mainHours?.to}
              keyboardType='numeric'
              placeholder='hs.'
              onChangeText={(value) => manageHours('to', value)}
            />
          </View>
        </View>
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
      {
        deleteModal
          ? <DeleteEnv setDeleteModal={setDeleteModal} environment={environment} navigation={navigation} />
          : null
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#363435',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    minHeight: height,
    paddingVertical: 40
  },
  titleCont: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  title: {
    paddingVertical: 20,
    fontSize: 22,
    color: 'whitesmoke'
  },
  iconTrash: {
    fontSize: 30,
    color: 'red'
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
  },
  daysCont: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center'
  },
  dayCont: {
    width: '25%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayName: {
    color: 'whitesmoke',
    fontWeight: 600
  },
  hoursCont: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  inputHour: {
    backgroundColor: "whitesmoke",
    borderWidth: 0,
    borderRadius: 8,
    height: 38,
    paddingLeft: 10,
    width: 100
  },
  hourText: {
    color: 'whitesmoke',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 800
  }
})

export default EditEnvForm