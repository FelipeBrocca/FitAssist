import React, { useReducer, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from "../reducers/Auth.reducer";
import { setCurrentUser } from "../actions/Auth.actions";
import AuthGlobal from './AuthGlobal'

const Auth = props => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {}
  });
  const [showChild, setShowChild] = useState(false)
  const [loading, setLoading] = useState(true)

  const getStorage = async () => {
    try {
      let item = await AsyncStorage.getItem('jwt');
      return item;
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    setShowChild(true);

    getStorage().then((item) => {
      if (item) {
        const decoded = item ? item : '';
        if (setShowChild) {
          dispatch(setCurrentUser(jwt_decode(decoded)));
        }
      }
    });

    setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => setShowChild(false);
  }, []);


  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
          loading
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    )
  }
}

export default Auth