import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "../../assets/common/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER"

export const loginUser = (user, dispatch) => {
    fetch(`${baseUrl}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        },
    })
        .then((res) => res.json())
        .then(async (data) => {
            if (data) {
                const token = data.token;
                await AsyncStorage.setItem("fTjAsWiT", token)
                const decoded = jwt_decode(token)
                dispatch(setCurrentUser(decoded, user))
            } else {
                logOut(dispatch)
            }
        })
        .catch(err => {
            logOut(dispatch)
        })
}

export const getUserProfile = (id) => {
    fetch(`${baseUrl}/users/${id}`, {
        method: 'GET',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch(err => console.log(err))
}

export const logOut = async (dispatch) => {
    await AsyncStorage.removeItem("fTjAsWiT");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}