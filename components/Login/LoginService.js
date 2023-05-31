import React from 'react'
import LoginForm from './LoginForm'
import { View, StyleSheet } from 'react-native'

const LoginService = () => {
  return (
    <View style={[styles.container]}>
        <LoginForm />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#363435'
    }
})

export default LoginService