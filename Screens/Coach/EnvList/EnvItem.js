import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const EnvItem = ({ envi }) => {

    // Array con los números de los días
    const diasArray = [1, 2, 3, 4, 5, 6, 7];

    // Array con los días que deseas buscar
    const diasBuscados = envi?.mainDays;

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener el número del día actual (1 al 7, donde lunes es 1)
    const diaActual = fechaActual.getDay() || 7;

    // Encontrar el siguiente día buscado
    let siguienteDiaBuscado = null;
    for (let i = 0; i < diasBuscados.length; i++) {
        if (diasBuscados[i] >= diaActual) {
            siguienteDiaBuscado = diasBuscados[i];
            break;
        }
    }

    // Obtener la fecha de la siguiente ocurrencia del día buscado
    let siguienteFecha = null;
    if (siguienteDiaBuscado) {
        const diferenciaDias = siguienteDiaBuscado - diaActual;
        siguienteFecha = new Date(fechaActual.getTime() + diferenciaDias * 24 * 60 * 60 * 1000);
    }

    // Imprimir el resultado
    if (siguienteFecha) {
        const diaSemana = diasArray[siguienteDiaBuscado - 1];
        console.log(`El próximo día ${diaSemana} es ${siguienteFecha.toLocaleDateString()}.`);
    } else {
        console.log('No se encontró el próximo día buscado.');
    }


    return (
        <View style={styles.container}>
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
            {/* <View style={styles.buttonsCont}>
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
                    </View> */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '90%',
        minHeight: 50,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'flex-start'
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
        fontSize: 16,
        paddingLeft: 20
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

export default EnvItem