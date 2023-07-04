import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommonEnvList = ({ environments, navigation }) => {
  if (environments[0]) {
    return (
      environments.map((envi, index) => (
        <View style={styles.container} key={index}>
          <Text style={styles.title}>{envi.name}</Text>
          <View style={styles.content}>
            {
              envi.trainings[0]
                ? <>
                  <Text style={styles.place}>Lugar: {envi.trainings[0].place}</Text>
                  <Text>Fecha: {envi.trainings[0].date}</Text>
                  <Text>Horario: {envi.trainings[0].hour}</Text>
                </>
                : <>
                  <Text style={styles.noTraining}>
                    No hay entrenamiento en fila
                  </Text>
                </>
            }
          </View>
          <View style={styles.buttonCont}>
            <Text style={styles.buttonsTitle}>Asistir</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.buttonTouchCheck}
              >
                <Icon
                  name='check'
                  style={styles.buttonCheck}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonTouchNo}
              >
                <Icon
                  name='remove'
                  style={styles.buttonNo}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))
    )
  } else return <Text>Encontrá el mejor entrenamiento para vos!</Text>;
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 130,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  title: {
    position: 'absolute',
    left: 10,
    top: -30,
    fontSize: 20,
    color: 'whitesmoke',
    fontWeight: 800
  },
  content: {
    width: '50%',
    justifyContent: 'center'
  },
  buttonCont: {
    width: '25%',
    minWidth: 90,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: 10
  },
  noTraining: {
    color: 'grey',
    fontSize: 16
  },
  buttonTouchCheck: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 202, 166, 0.5)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTouchNo: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonCheck: {
    fontSize: 20,
    color: 'whitesmoke'
  },
  buttonNo: {
    fontSize: 20,
    color: 'whitesmoke'
  },
  buttonsTitle: {
    color: 'whitesmoke',
    fontSize: 18,
    fontWeight: 600,
    width: '100%',
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row',
    gap: 15
  }
})

export default CommonEnvList