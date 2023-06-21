import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native'

import baseUrl from '../../assets/common/baseUrl'
import axios from 'axios'
import AuthGlobal from '../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
                <View>
                {
                    envi[0]
                        ? envi.map((en, index) => {
                            if (context.stateUser.user.userId && context.stateUser.user.userId === en.coach) {
                                return (
                                    <Text key={index}>{en.mainPlace}</Text>
                                )
                            } else {
                                return <Text key={index}>No tiene ambiente creado</Text>
                            }
                        })
                        : null
                }
                </View>
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