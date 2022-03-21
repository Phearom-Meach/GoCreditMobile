import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QRCode from "../../page/qrCode";
import Notification from "../../page/notification";
import Setting from "../../components/setting/setting";



const Stack = createNativeStackNavigator();
const QRcodeStack = () => {
  return (
    <Stack.Navigator  screenOptions={{ headerStyle: { backgroundColor: "tomato" },headerShown:false }}>
      <Stack.Screen name="QRCode" component={QRCode} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default QRcodeStack;