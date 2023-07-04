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
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem('jwt')
            .then((res) => {
                setToken(res)
            })
    }, [])

    const getEnvironments = () => {
        setLoading(true)
        if (token) {
            axios
                .get(`${baseUrl}/users/${context.stateUser.user.userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(envis => {
                    if (envis.data.environment[0]) {
                        const environmentPromises = envis.data.environment.map((env) => (
                            axios.get(`${baseUrl}/environments/${env}`, {
                                headers: { Authorization: `Bearer ${token}` }
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
        }
    }


    const createEnv = (newEnvironment, navigation) => {
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

    const editEnv = (id, newEnvironment, navigation) => {
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

    const deleteEnv = (id, navigation) => {
        axios
            .delete(`${baseUrl}/environments/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                if (res.status === 204) {
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
            deleteEnv,
            resetEnvs
        }}>
            {children}
        </environmentsContext.Provider >
    )
}