import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { Animated, StyleSheet, Easing } from 'react-native';

const Spinner = () => {
    const spinValue = new Animated.Value(0)

    const spin = () => {
        spinValue.setValue(0)
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => spin())
    }
    useEffect(() => {
        spin()
    }, [])

    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    return (
        <Animated.View style={{ transform: [{ rotate }] }}>
            <Icon name='loading1' color='#00CAA6' size={40} />
        </Animated.View>
    )
}

export default Spinner