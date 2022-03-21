import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import More from "../../page/more";
import Setting from "../../components/setting/setting";
import MyProfile from "../../components/setting/myprofile/myProfile";
import ChangePin from "../../components/setting/changePin";
import PayPlace from "../../components/More/modalPlace/payPlace";
import Verify from "../../page/verify";
import Success from "../../page/success";
import Notification from "../../page/notification";




const Stack = createNativeStackNavigator();
const MoreStack = ({navigation}) => {
  return (
    <Stack.Navigator  screenOptions={{ headerStyle: { backgroundColor: "tomato" },headerShown:false }}>
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="ChangePin" component={ChangePin} />
      <Stack.Screen name="PayPlace" component={PayPlace} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="Notification" component={Notification} />
      
    </Stack.Navigator>
  );
};

export default MoreStack;