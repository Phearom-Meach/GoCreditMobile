import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Expend from "../../components/account/expend";
import Account from "../../page/account";
import Notification from "../../page/notification";
import Setting from "../../components/setting/setting";
import AlertModal from "../../components/account/modal/alertModal";



const Stack = createNativeStackNavigator();

const AccountStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "tomato" },headerShown:false }}
    >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Expend" component={Expend} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="AlertModal" component={AlertModal} />
    </Stack.Navigator>
  );
};

export default AccountStack;
