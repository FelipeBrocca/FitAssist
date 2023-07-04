import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import { useEnvironments } from '../../../Context/EnvContext'
import AuthGlobal from '../../../Context/store/AuthGlobal'

const { width, height } = Dimensions.get('window')

const DeleteEnv = ({ setDeleteModal, environment, navigation }) => {

    const context = useContext(AuthGlobal)
    const { deleteEnv } = useEnvironments()
    const [allowConfirm, setAllowConfirm] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const handleInput = (value) => {
        setInputValue(value)
    }

    useEffect(() => {
        if (inputValue === environment?.name) {
            setAllowConfirm(true)
        } else {
            if (allowConfirm) {
                setAllowConfirm(false)
            }
        }
    }, [inputValue])

    const handleDelete = (id) => {
        if (context.stateUser.user.userId === environment.coach) {
            deleteEnv(id, navigation)
        } else {
            console.log('Error: Not allowed');
        }
    }

    return (
        <>
            <View style={styles.backdrop}>
            </View>
            <View style={styles.modalCont}>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>Deseas eliminar este grupo? Para confirmar, escribe el nombre del mismo "{environment?.name}"</Text>
                    <TextInput onChangeText={(value) => handleInput(value)} style={styles.modalInput}></TextInput>
                    <View style={styles.buttCont}>
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setDeleteModal(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                        {
                            allowConfirm
                                ? <TouchableOpacity style={styles.modalConfirm} onPress={() => handleDelete(environment?._id)}>
                                    <Text style={styles.confirmText}>Confirmar</Text>
                                </TouchableOpacity>
                                : <View style={styles.confirmDisCont}>
                                    <Text style={styles.confirmDis}>
                                        Confirmar
                                    </Text>
                                </View>
                        }
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        width: width,
        height: height + 50,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    modalCont: {
        position: 'absolute',
        width: width,
        height: height - 100,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0
    },
    modal: {
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        padding: 15,
        width: '95%',
        gap: 15
    },
    modalText: {
        fontSize: 18
    },
    modalInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        paddingLeft: 15
    },
    buttCont: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        marginTop: 10
    },
    modalCancel: {
        width: 100,
        height: 40,
        backgroundColor: '#FE6816',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    modalConfirm: {
        width: 100,
        height: 40,
        backgroundColor: '#00CAA6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    confirmText: {
        color: 'whitesmoke',
        fontSize: 18,
        fontWeight: 600
    },
    cancelText: {
        color: 'whitesmoke',
        fontSize: 18,
        fontWeight: 600
    },
    confirmDisCont: {
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        borderRadius: 5,
        opacity: 0.5
    },
    confirmDis: {
        textAlign: 'center',
        color: 'whitesmoke',
        fontSize: 18,
        fontWeight: 600
    }
})

export default DeleteEnv