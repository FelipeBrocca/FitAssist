import React from 'react'
import { SafeAreaView, Text, Image, StyleSheet } from 'react-native'

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Image source={require('../assets/logo-claro.png')} />
            <Text>FitAssist</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
})

export default Header