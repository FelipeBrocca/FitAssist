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



const { width, height } = Dimensions.get('window')

const Home = ({ navigation }) => {

    const context = useContext(AuthGlobal)
    const [environments, setEnvironments] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (context.stateUser.isAuthenticated === false) {
            navigation.navigate("Login")
        }
    }, [context.stateUser.isAuthenticated])

    useFocusEffect((
        useCallback(() => {
            setLoading(true)
            AsyncStorage.getItem('jwt')
                .then((res) => {
                    axios
                        .get(`${baseUrl}/users/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${res}` }
                        })
                        .then(envis => {
                            if (envis.data.environment[0]) {
                                envis.data.environment.map((env) => (
                                    axios
                                        .get(`${baseUrl}/environments/${env}`, {
                                            headers: { Authorization: `Bearer ${res}` }
                                        })
                                        .then(en => (
                                            setEnvironments(prev => [...prev, en.data],
                                                setTimeout(() => {
                                                    setLoading(false)
                                                }, 1000)
                                            )
                                        ))
                                ))
                            } else setLoading(false);
                        })
                })
                .catch(err => console.log(err))

            return () => {
                setEnvironments([])
            }
        }, [])
    ))

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.envList}>
                {
                    loading
                        ? <Text>Cargando...</Text>
                        : <>
                            {
                                context?.stateUser?.user?.isCoach
                                    ? <EnvList environments={environments} />
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
        height: height - 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#363435'
    },
    envList: {
        width: width,
        height: height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 50,
        gap: 60
    }
})

export default Home