import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';


import AuthGlobal from "../Context/store/AuthGlobal";

import LoginService from "../Screens/Login/LoginService";
import RegisterService from '../Screens/Register/RegisterService'
import Home from '../Screens/Home/Home'
import Loader from '../Screens/Loader/Loader'
import Header from "../Shared/Header";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

  const { stateUser, loading } = useContext(AuthGlobal)

  if (loading) {
    return <Loader />
  } else {
    return (
      <>
        {
          Object.keys(stateUser.user).length > 0
            ? <Header />
            : null
        }
        <Stack.Navigator initialRouteName={
          Object.keys(stateUser.user).length > 0 ? "Home" : "Login"
        }>
          {Object.keys(stateUser.user).length > 0
            ? (
              <>
                <Stack.Screen
                  name="Home"
                  options={{ headerShown: false }}
                  component={Home}
                />
              </>
            )
            : (
              <>
                <Stack.Screen
                  name="Login"
                  options={{ headerShown: false }}
                  component={LoginService}
                />
                <Stack.Screen
                  name="Register"
                  options={{ headerShown: false }}
                  component={RegisterService}
                />
              </>
            )}
        </Stack.Navigator>
      </>
    )
  }
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator