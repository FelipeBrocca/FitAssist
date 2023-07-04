import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../common/baseUrl';
import axios from 'axios';
import AuthGlobal from './store/AuthGlobal';

const environmentsContext = createContext()

export const useEnvironments = () => {
    const context = useContext(environmentsContext)
    return context
}

export const EnvironmentsProvider = ({ children }) => {

    const context = useContext(AuthGlobal)
    const [environments, setEnvironments] = useState([])
    const [loading, setLoading] = useState(false)

    const getEnvironments = () => {
        setLoading(true)
        AsyncStorage.getItem('jwt')
            .then((res) => {
                axios
                    .get(`${baseUrl}/users/${context.stateUser.user.userId}`, {
                        headers: { Authorization: `Bearer ${res}` }
                    })
                    .then(envis => {
                        if (envis.data.environment[0]) {
                            const environmentPromises = envis.data.environment.map((env) => (
                                axios.get(`${baseUrl}/environments/${env}`, {
                                    headers: { Authorization: `Bearer ${res}` }
                                })
                            ));

                            Promise.all(environmentPromises)
                                .then(environmentsData => {
                                    const validEnvironmentsData = environmentsData.filter(en => en && en.data && en.data._id);
                                    const environments = validEnvironmentsData.map(en => en.data);
                                    setEnvironments(prev => {
                                        const newEnvironments = environments.filter(env => {
                                            return !prev.some(prevEnv => prevEnv._id === env._id);
                                        });
                                        setTimeout(() => {
                                            setLoading(false);
                                        }, 1000);
                                        return [...prev, ...newEnvironments];
                                    });
                                    setLoading(false);
                                })
                                .catch(error => {
                                    console.log(error);
                                    setLoading(false);
                                });
                        } else {
                            setLoading(false);
                        }
                    })
            })
            .catch(err => console.log(err))
    }

    const createEnv = (newEnvironment, token, navigation) => {
        axios
            .post(`${baseUrl}/environments`, newEnvironment, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                const id = res.data._id
                if (res.status === 201) {
                    axios
                        .get(`${baseUrl}/users/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        .then(res => {
                            const userData = res.data;
                            userData.environment.push(id)
                            axios
                                .put(`${baseUrl}/users/${context.stateUser.user.userId}`, userData, {
                                    headers: { Authorization: `Bearer ${token}` }
                                })
                                .then((res) => {
                                    if (res.status === 201) {
                                        setTimeout(() => {
                                            navigation.navigate("Home")
                                            getEnvironments()
                                        }, 300)
                                    }
                                })
                                .catch((err) => console.log(err))
                        })
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const editEnv = (id, newEnvironment, token, navigation) => {
        axios
            .put(`${baseUrl}/environments/${id}`, newEnvironment, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                if (res.status === 201) {
                    setEnvironments([])
                    setTimeout(() => {
                        navigation.navigate("Home")
                        getEnvironments()
                    }, 300)
                }
            })
            .catch((err) => console.log(err))
    }

    const resetEnvs = () => {
        setEnvironments([])
    }

    return (
        <environmentsContext.Provider value={{
            environments,
            setEnvironments,
            getEnvironments,
            loading,
            createEnv,
            editEnv,
            resetEnvs
        }}>
            {children}
        </environmentsContext.Provider >
    )
}