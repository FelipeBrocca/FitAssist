import React from 'react'
import { SafeAreaView, Text, Image, StyleSheet, Dimensions, View } from 'react-native'

const { width, height } = Dimensions.get('window')

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo-claro.png')} />
                <Text style={styles.logoTitle}>FitAssist</Text>
            </View>
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
        alignItems: 'center',
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
    }
})

export default Header