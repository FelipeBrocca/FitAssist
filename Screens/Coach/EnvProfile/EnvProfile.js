import React from 'react'
import { useRoute } from '@react-navigation/native';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


const { width, height } = Dimensions.get('window')


const EnvProfile = ({ navigation }) => {

    const route = useRoute()
    const { environment } = route.params
    const days = [
        { name: 'Lunes', value: 1 },
        { name: 'Martes', value: 2 },
        { name: 'Miércoles', value: 3 },
        { name: 'Jueves', value: 4 },
        { name: 'Viernes', value: 5 },
        { name: 'Sábado', value: 6 },
        { name: 'Domingo', value: 7 },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.contentData}>
                    <Text>{environment?.name}</Text>
                    <Text>{environment?.mainPlace}</Text>
                    {
                        environment?.mainDays?.map((day, index) => (
                            <Text key={index}>{days[day].name}</Text>
                        ))
                    }
                    <Text>{environment?.mainHours?.since} hs.</Text>
                    <Text> - {environment?.mainHours?.to} hs.</Text>
                </View>
                <TouchableOpacity style={styles.editContent} onPress={() => navigation.navigate('EditEnvForm', { environment: environment })}>
                    <Icon
                        style={styles.iconEdit}
                        name='pencil'
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Text>Administrar entrenamientos</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        minHeight: height,
        backgroundColor: '#363435',
        alignItems: 'center',
        paddingTop: 60
    },
    content: {
        flexDirection: 'row',
        position: 'relative',
        width: '90%',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10
    },
    contentData: {
        width: '100%'
    },
    editContent: {
        position: 'absolute',
        top: -20,
        right: 20,
        backgroundColor: '#363435',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10
    },
    iconEdit: {
        fontSize: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: 'whitesmoke'
    }
})

export default EnvProfile