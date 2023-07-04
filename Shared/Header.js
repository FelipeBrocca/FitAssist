import React, { useContext } from 'react'
import { SafeAreaView, Text, Image, StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native'
import { logOut } from '../Context/actions/Auth.actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../Context/store/AuthGlobal';
import { useEnvironments } from '../Context/EnvContext';



const { width, height } = Dimensions.get('window')

const Header = () => {

    const context = useContext(AuthGlobal)
    const { resetEnvs } = useEnvironments()

    return (
        <SafeAreaView style={styles.header}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo-claro.png')} />
                <Text style={styles.logoTitle}>FitAssist</Text>
            </View>

            <TouchableOpacity
                style={styles.logOut}
                onPress={async () => {
                    try {
                        resetEnvs()
                        await AsyncStorage.removeItem("jwt")
                        logOut(context.dispatch);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        if (Object.keys(context.stateUser.user).length <= 0) {
                            navigation.navigate("Login")
                        }
                    }
                }}
            >
                <Text style={styles.logOutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: width,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: 40,
        padding: 15,
        borderBottomColor: '#8e8e8e',
        borderBottomWidth: 1,
        backgroundColor: '#363435'
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10
    },
    logoTitle: {
        fontSize: 18,
        color: 'whitesmoke',
        fontWeight: 800
    },
    logo: {
        height: 50,
        width: 50
    },
    logOut: {
        backgroundColor: "#e02828",
        padding: 5,
        borderRadius: 5,
        color: 'white'
    },
    logOutText: {
        color: 'whitesmoke',
        fontWeight: 600,
        fontSize: 10
    }
})

export default Header