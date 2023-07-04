import EnvItem from './EnvItem';
import { Text } from 'react-native';


const EnvList = ({ environments, navigation }) => {

    if (environments[0]) {
        return (
            environments.map((envi, index) => (
                <EnvItem envi={envi} key={index} />
            ))
        )
    } else return (
        <Text>Crea tu primer grupo!</Text>
    )

}

export default EnvList