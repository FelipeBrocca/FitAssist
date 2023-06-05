import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, ScrollView, Dimensions } from 'react-native'

import baseUrl from '../../assets/common/baseUrl'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { logOut } from '../../Context/actions/Auth.actions'
import Header from '../../Shared/Header'


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
                    .get(`${baseUrl}/environments`, {
                        headers: { Authorization: `Bearer ${res}` }
                    })
                    .then(envis => setEnvi(envis.data))
            })
            .catch(err => console.log(err))

        return () => {
            setEnvi([])
        }
    }, [context.stateUser.isAuthenticated])

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                {
                    envi[0]
                        ? envi.map((en, index) => (
                            <Text key={index}>{en.mainPlace}</Text>
                        ))
                        : null
                }
                <Button
                    title='Cerrar sesion'
                    onPress={async () => {
                        try {
                            await AsyncStorage.removeItem("fTjAsWiT")
                            logOut(context.dispatch);
                        } catch (error) {
                            console.error(error);
                        } finally {
                            if (Object.keys(context.stateUser.user).length <= 0){
                                navigation.navigate("Login")
                            }
                        }
                    }}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        width: width,
        height: height,
        backgroundColor: '#363435'
    },
    container: {
        width: width,
        height: height - 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Home