import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const EnvList = ({ environments }) => {
    if (environments[0]) {
        console.log(environments)
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
                                    <Text style={styles.place}>Lugar: {envi.mainPlace}</Text>
                                </>
                        }
                    </View>
                    <View style={styles.buttonCont}>

                    </View>
                </View>
            ))
        )
    } else return null

}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 80,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        position: 'absolute',
        left: 10,
        top: -30,
        fontSize: 20,
        color: 'whitesmoke'
    },
    content: {
        width: '68%'
    },
    buttonCont: {
        width: '22%'
    }
})

export default EnvList