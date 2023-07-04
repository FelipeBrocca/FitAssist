import React from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get("window")

const Loader = () => {

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo-claro.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height + 50,
        backgroundColor: '#363435',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      },
    logo: {
        width: '80%',
        maxWidth: 200,
        height: '80%',
        maxHeight: 200
    }
})

export default Loader