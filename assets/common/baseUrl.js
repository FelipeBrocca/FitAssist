import { Platform } from 'react-native';

let baseUrl = '';

{
    Platform.OS === 'android'
    ? baseUrl = 'http://10.0.2.2:3500'
    : baseUrl = 'http://localhost:3500'
}

export default baseUrl;