import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import baseUrl from '../../common/baseUrl'
import axios from 'axios'
import AuthGlobal from '../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateEnv from '../Coach/CreateEnv/CreateEnv';
import EnvList from '../Coach/EnvList/EnvList'
import CommonEnvList from '../CommonUser/EnvList/CommonEnvList'
import { useEnvironments } from '../../Context/EnvContext'



const { width, height } = Dimensions.get('window')

const Home = ({ navigation }) => {

    const context = useContext(AuthGlobal)
    const { loading, environments, getEnvironments } = useEnvironments()

    useEffect(() => {
        if (context.stateUser.isAuthenticated === false) {
            navigation.navigate("Login")
        }
    }, [context.stateUser.isAuthenticated])

    useEffect(() => {
        getEnvironments()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.username}>Hola {context.stateUser.user.name}!</Text>
            <ScrollView contentContainerStyle={styles.envList}>
                {
                    loading
                        ? <Text>Cargando...</Text>
                        : <>
                            {
                                context?.stateUser?.user?.isCoach
                                    ? <EnvList navigation={navigation} environments={environments} />
                                    : <CommonEnvList environments={environments} />
                            }
                        </>
                }
            </ScrollView>
            {
                context?.stateUser?.user?.isCoach
                    ? <CreateEnv navigation={navigation} />
                    : null
            }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: width,
        minHeight: height - 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#363435'
    },
    envList: {
        width: width,
        minHeight: height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 50,
        gap: 60
    },
    username: {
        color: 'whitesmoke',
        textAlign: 'left',
        width: '100%',
        fontSize: 30
    }
})

export default Home