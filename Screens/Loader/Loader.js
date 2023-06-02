import React, { useContext, useEffect } from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import AuthGlobal from '../../Context/store/AuthGlobal';


const { width, height } = Dimensions.get("window")

const Loader = ({ navigation }) => {

    const context = useContext(AuthGlobal)

    useEffect(() => {
        if (context.stateUser.isAuthenticated !== null &&
            context.stateUser.isAuthenticated === true) {
            setTimeout(() => {
                navigation.navigate("Home");
            }, 1000);
        } else if (context.stateUser.isAuthenticated === null ||
            context.stateUser.isAuthenticated === true) {
            setTimeout(() => {
                navigation.navigate("Login");
            }, 1000);
        }
    }, [context.stateUser.isAuthenticated])

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo-claro.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#363435',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: '80%',
        maxWidth: 200,
        height: '80%',
        maxHeight: 200
    }
})

export default Loader