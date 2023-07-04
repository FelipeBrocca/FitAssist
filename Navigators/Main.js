import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';


import AuthGlobal from "../Context/store/AuthGlobal";

import LoginService from "../Screens/Login/LoginService";
import RegisterService from '../Screens/Register/RegisterService'
import Home from '../Screens/Home/Home'
import Loader from '../Screens/Loader/Loader'
import Header from "../Shared/Header";
import FormEnvCreate from "../Screens/Coach/CreateEnv/FormEnvCreate";
import EditEnvForm from "../Screens/Coach/EditEnv/EditEnvForm";
import EnvProfile from "../Screens/Coach/EnvProfile/EnvProfile";

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
          {stateUser?.isAuthenticated ? (
            <>
              <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={Home}
              />
              {
                stateUser.user.isCoach
                  ? <>
                    <Stack.Screen
                      name="FormEnvCreate"
                      options={{ headerShown: false }}
                      component={FormEnvCreate}
                    />
                    <Stack.Screen
                      name="EnvProfile"
                      options={{ headerShown: false }}
                      component={EnvProfile}
                    />
                    <Stack.Screen
                      name="EditEnvForm"
                      options={{ headerShown: false }}
                      component={EditEnvForm}
                    />
                  </>
                  : null
              }
            </>
          ) : (
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