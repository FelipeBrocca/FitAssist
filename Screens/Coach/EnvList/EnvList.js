import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const EnvList = ({ environments, navigation }) => {

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
                        <TouchableOpacity
                            style={styles.buttonTouch}
                            onPress={() => navigation.navigate('EnvProfile', { environment: envi })}
                        >
                            <Icon
                                name='cog'
                                style={styles.buttonIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonsCont}>
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
            ))
        )
    } else return (
        <Text>Crea tu primer grupo!</Text>
    )

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
        justifyContent: 'space-around'
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
        width: '68%',
        justifyContent: 'center'
    },
    buttonCont: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -30,
        right: 0
    },
    noTraining: {
        color: 'grey',
        fontSize: 16
    },
    buttonTouch: {
        borderRadius: 5
    },
    buttonIcon: {
        fontSize: 25,
        color: 'whitesmoke'
    },
    buttonTouchCheck: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 202, 166, 0.5)',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsCont: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
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
})

export default EnvList