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
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backCont}>
                <Icon
                    name='reply'
                    style={styles.backIcon}
                />
                <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.contentData}>
                    <Text style={styles.title}>{environment?.name}</Text>
                    <Text style={styles.place}>
                        {environment?.mainPlace ? environment.mainPlace : 'Sin lugar predeterminado'}
                    </Text>
                    <View style={styles.daysCont}>
                        {
                            environment?.mainDays[0]
                                ? environment?.mainDays?.map((day, index) => (
                                    <Text style={styles.days} key={index}>{days[day - 1]?.name}</Text>
                                ))
                                : <Text style={styles.days}>Sin días predeterminados</Text>
                        }
                    </View>
                    <View style={styles.hoursCont}>
                        <Text style={styles.since}>{environment?.mainHours?.since} hs.</Text>
                        <Text style={styles.to}> - {environment?.mainHours?.to} hs.</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editContent} onPress={() => navigation.navigate('EditEnvForm', { environment: environment })}>
                    <Icon
                        style={styles.iconEdit}
                        name='edit'
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.adminTrainings}>
                <Text style={styles.admText}>Administrar entrenamientos</Text>
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
        paddingTop: 100,
        gap: 50,
        position: 'relative'
    },
    content: {
        flexDirection: 'row',
        position: 'relative',
        width: '90%',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        minHeight: 150
    },
    contentData: {
        width: '100%',
        flexWrap: 'wrap',
        padding: 10,
        gap: 5,
        alignItems: 'center'
    },
    editContent: {
        position: 'absolute',
        top: -20,
        right: 20,
        backgroundColor: '#363435',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconEdit: {
        fontSize: 30,
        padding: 10,
        color: 'whitesmoke'
    },
    title: {
        width: '100%',
        color: 'whitesmoke',
        fontSize: 22,
        textAlign: 'center'
    },
    place: {
        color: 'whitesmoke',
        fontSize: 16,
        width: '100%',
        textAlign: 'center'
    },
    daysCont: {
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 6,
        justifyContent: 'center'
    },
    days: {
        fontSize: 16,
        color: 'whitesmoke',
        fontWeight: 600
    },
    hoursCont: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    since: {
        color: 'whitesmoke'
    },
    to: {
        color: 'whitesmoke'
    },
    adminTrainings: {
        padding: 10,
        backgroundColor: '#00CAA6',
        borderRadius: 5
    },
    admText: {
        color: 'whitesmoke',
        fontSize: 16,
        fontWeight: 800
    },
    backCont: {
        position: 'absolute',
        top: 15,
        left: 15,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    backText: {
        fontSize: 25,
        color: 'whitesmoke'
    },
    backIcon: {
        fontSize: 20,
        color: 'whitesmoke'
    }
})

export default EnvProfile