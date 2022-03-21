import { View, Text } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../color";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import QRcodeStack from "./stack/qrCodeStack";
import NotificationStack from "./stack/notificationStack";
import MoreStack from "./stack/moreStack";
import AccountStack from "./stack/accountStack";

const Tab = createBottomTabNavigator();
const TabNavigation = ({navigation}) => {

  React.useEffect(()=>{
    // console.log(navigation)
  },[navigation])

  return (
    <Tab.Navigator
      initialRouteName="AccountStack"
      activeColor="#FFFFFF"
      inactiveColor="#FFFF"
      // barStyle={{ backgroundColor: COLORS.PRIMARY, borderColor: "#ffffff", }}
      screenOptions={{ 
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: { 
          backgroundColor:COLORS.PRIMARY, 
          color: "#FFFF"
           
        }, 
      }}
    >
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          headerShown:false,
          tabBarIcon: ({ color,focused }) => (
            <View style={{
              justifyContent: "center",
              alignItems: "center"
            }}>
            <MaterialIcons
              name="account-balance-wallet"
              size={24}
              color="white"
            />
             {focused? <Text style={{color: "#FFFF",fontSize:12}}>Account</Text>:null}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="QRcodeStack"
        component={QRcodeStack}
        options={{
          headerShown:false,
          tabBarLabel: "QR Code",
          tabBarIcon: ({ color,focused }) => (
            <View style={{
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Ionicons name="qr-code-outline" size={24} color="white" />
             {focused? <Text style={{color: "#FFFF",fontSize:12}}>QR Code</Text>:null}
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="NotificationStack"
        component={NotificationStack}
        options={{
          headerShown:false,
          tabBarLabel: "NotificationStack",
          tabBarIcon: ({ color,focused }) => (
            <View style={{
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Ionicons name="notifications" size={24} color="white" />
             {focused? <Text style={{color: "#FFFF",fontSize:12}}>Notification</Text>:null}
            </View>
          ),
        }}    
      />
      
      <Tab.Screen
        name="MoreStack" 
        component={MoreStack} 
        options={{
          headerShown:false,
          tabBarLabel: "MoreStack",
          tabBarIcon: ({ color,focused }) => (
             <View style={{
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Entypo name="dots-three-horizontal" size={24} color="white" />
             {focused? <Text style={{color: "#FFFF",fontSize:12}}>More</Text>:null}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
