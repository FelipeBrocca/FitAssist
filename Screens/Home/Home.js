import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'

import baseUrl from '../../assets/common/baseUrl'
import axios from 'axios'
import AuthGlobal from '../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateEnv from '../Coach/CreateEnv/CreateEnv';



const { width, height } = Dimensions.get('window')

const Home = ({ navigation }) => {

    const context = useContext(AuthGlobal)
    const [envi, setEnvi] = useState([])

    useEffect(() => {
        if (context.stateUser.isAuthenticated === false) {
            navigation.navigate("Login")
        }
        AsyncStorage.getItem('fTjAsWiT')
            .then((res) => {
                axios
                    .get(`${baseUrl}/users/${context.stateUser.user.userId}`, {
                        headers: { Authorization: `Bearer ${res}` }
                    })
                    .then(envis => {
                        envis.data.environment.map((env) => (
                            axios
                                .get(`${baseUrl}/environments/${env}`, {
                                    headers: { Authorization: `Bearer ${res}` }
                                })
                                .then(en => setEnvi(prev => [...prev, en.data]))
                        ))
                    })
            })
            .catch(err => console.log(err))

        return () => {
            setEnvi([])
        }
    }, [context.stateUser.isAuthenticated])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.envList}>
                {
                    context?.stateUser?.user?.isCoach
                    ? envi[0]
                    ? envi.map((envi, index) => (
                        <Text key={index}>{envi.mainPlace}</Text>
                    ))
                    : <Text>No tiene grupo creado</Text>
                    : envi[0]
                    ? envi.map((envi, index) => (
                        <Text key={index}>{envi.mainPlace}</Text>
                    ))
                    : <Text>No es coach</Text>
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
        justifyContent: 'center'
    }
})

export default Home