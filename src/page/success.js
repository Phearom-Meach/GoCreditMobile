import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import Header2 from "../routes/header/header2";
import RootLog from "./rootLog";
import { GoButton } from "../static/own-comp";
import { COLORS } from "../../color";
import { StyleController } from "../context/provider/styleProvider";
import Root from "./root";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACTION } from "../context/reducer";
import { DataController } from "../context/provider";

export default function Success({ navigation }) {
  const { styleState, height, width } = useContext(StyleController);
  const {loginedDispatch,userDispatch,language} = useContext(DataController)
  // const Successful = navigation?.getParam("successful");

  const signOutFn = async () => {
    
    try {
      // await AsyncStorage.removeItem("@user");
      await AsyncStorage.clear();
      loginedDispatch({
        type: ACTION.LOGIN_USER,
        payload: false,
      });
      userDispatch({
        type: ACTION.LOGOUT_USER,
      });
    } catch (e) {
      // remove error
    }
  };
  return (
    <View
    style={{
      // backgroundColor: COLORS.MAIN,
      // minHeight: styleState.fullScreen,
    }}
    >
      <StatusBar barStyle="default" />
      <SafeAreaView>
        <View
          style={{
            paddingRight: styleState.rootPad,
            marginBottom: Platform.OS === "ios" ? 0 : 0,
            // position: 'absolute',
            // bottom:0
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <LinearGradient
              colors={["#ffff", "rgba(61,207,88,1) 100%", "#ffff"]}
              locations={[0.9, 0.1, 0.9]}
              style={{
                height: Platform.OS === "ios" ? 80 : 70,
                // backgroundColor: 'yellow'
              }}
            >
            
            </LinearGradient>

            <View style={styles.bgIcon}>
              <AntDesign
                name="checkcircle"
                size={100}
                color="#3dcf58"
                style={{ alignSelf: "center", padding: 10, top: 30 }}
              />
              <View style={{ alignSelf: "center", top: 30 }}>
                {language?.english?
                <Text style={{ fontSize: 22 }}>Successful</Text>
                :
                <Text style={{ fontSize: 22 }}>ជោគជ័យ</Text>
              }
                
              </View>
            </View>
            
            
           
            <View
              style={{
                width: width,
                position: "absolute",
                bottom: 0,
              }}
            >
              <View style={{ alignItems: "center" }}>
                {language?.english?
                <GoButton
                style={{
                  backgroundColor: COLORS.PRIMARY,
                  width: "100%",
                }}
                color="white"
                title="DONE"
                size={18}
                align="center"
                font={styleState.headKh}
                onPress={() => signOutFn()}
              />
              :
              <GoButton
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    width: "100%",
                  }}
                  color="white"
                  title="រួចរាល់"
                  size={18}
                  align="center"
                  font={styleState.headKh}
                  onPress={() => signOutFn()}
                />
              }
                
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
 
  bgIcon: {
    width: "100%",
    height: Platform.OS === "ios" ? 200 : 200,
    // backgroundColor: "pink",
    alignSelf: "center",
    position: "absolute",
    top: "25%",
  },
});
