import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginService from "../Screens/Login/LoginService";
import RegisterService from '../Screens/Register/RegisterService'
import Home from '../Screens/Home/Home'
import Loader from "../Screens/Loader/Loader";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Loader">
      <Stack.Screen
        name="Loader"
        options={{ headerShown: false }}
        component={Loader}
      />
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
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
    </Stack.Navigator>
  )
}

export default Main