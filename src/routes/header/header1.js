import React, { useContext,useState,useEffect } from "react";
import { View, Text, StyleSheet,TouchableOpacity,TouchableHighlight,TouchableNativeFeedback, Image, Platform } from "react-native";
import { COLORS } from "../../../color";
import { Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { StyleController } from "../../context/provider/styleProvider";
import { DataController } from "../../context/provider";
import { Badge } from 'react-native-paper';
import { ACTION } from "../../context/reducer";


export default function Header1({ title, navigation }) {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx ,notiNumDBCtx,notiNumDispatch} = useContext(DataController);
  const [notiBadge, setNotiBadge] = useState();
  


 const clearBadge = () => {
  notiNumDispatch({
    type: ACTION.NOTINUM,
    payload: []
  })
  navigation.navigate("Notification")
 }

  return (
    <View style={styles.header}> 
      <View style={styles.insideBar}>
        <View
          style={{
            width: width * 0.5,
            flexDirection: "row",
            alignItems: "flex-start",
            left: 10,
          }}
        >
          <View>
            <Image
              source={require("../../assets/LogoWhite.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.textBar}>{title}</Text>
        </View>
        <View
          style={{
            width: width * 0.5,
            height: 55,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            right: 5,
            // backgroundColor: 'red',
            // position:'relative'
          }}
        >
          <TouchableOpacity
           onPress={()=>clearBadge()}
            style={{ padding: 8, position: 'relative',left: 5,}}
         

          >
       
            <Ionicons
              name="notifications"
              size={24}
              color="white"
              activeOpacity={0.7}
              style={{ top: 1}}
              
            />
            { notiNumDBCtx.length===0 ? null :
              <Badge size={18} style={{position:'absolute',top:2,right:3}}>{ notiNumDBCtx.length}</Badge>
            }
         
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Setting")}
            
          >
            <Avatar
              size={Platform.OS === 'ios'? 60:55}
              icon={{ name: "user-circle", type: "font-awesome" }}
              activeOpacity={0.7}
            />

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 55,
    backgroundColor: COLORS.PRIMARY,
    borderBottomWidth: 1,
    borderColor: COLORS.MAIN,
   
  },
  insideBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  textBar: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    color: COLORS.MAIN,
    padding: 8,
    // left: 10,
  },
  logo: {
    width: Platform.OS === "ios" ? 40 : 40,
    height: Platform.OS === "ios" ? 40 : 40,
  },
});
