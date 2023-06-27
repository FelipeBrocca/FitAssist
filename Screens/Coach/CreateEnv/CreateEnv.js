import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const CreateEnv = ({ navigation }) => {
    return (
        <View style={styles.formCont}>
            <TouchableOpacity onPress={() => navigation.navigate('FormEnvCreate')} style={styles.button}>
                <Text style={styles.buttonText}>Nuevo</Text>
                <Text style={styles.buttonText}>Grupo</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    formCont: {
        position: 'absolute',
        bottom: 50,
        right: 15
    },
    button: {
        width: 90,
        height: 70,
        backgroundColor: '#00CAA6',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'  
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 600
    }
})

export default CreateEnv