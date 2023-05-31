import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginService from "../Screens/Login/LoginService";
import RegisterService from '../Screens/Register/RegisterService'

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
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
    </Stack.Navigator>
  )
}

export default Main