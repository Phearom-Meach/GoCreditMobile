import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./tabNavigation";
import Verify from "../page/verify";
import Success from "../page/success";

const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "tomato" },headerShown:false }}
    >
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
};

export default HomeStack;  