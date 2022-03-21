import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InputAccount from "../../components/login/inputAccount";
import Welcome from "../../components/login/welcome";
import Login from "../../page/login";

const Stack = createNativeStackNavigator();

const LoginStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "tomato" },headerShown:false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="InputAccount" component={InputAccount} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default LoginStack;