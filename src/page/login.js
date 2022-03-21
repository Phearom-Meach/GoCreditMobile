import React, { useContext } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { GoButton } from "../static/own-comp";
import { COLORS } from "../../color";
import { StyleController } from "../context/provider/styleProvider";
import RootLog from "./rootLog";
import { DataController } from "../context/provider";
import { ACTION } from "../context/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";


 const Login= ({ navigation })=> {
  const { language, languageDispatch } = useContext(DataController);
  const { styleState, height, width } = useContext(StyleController);
  
  const setLocalStorage = async (val) => {
    await AsyncStorage.setItem("@language", JSON.stringify(val));
  };
  const handleLanguage = (item) => {
    
    if (item === "en") {
      setLocalStorage({ khmer: false, english: true })
      languageDispatch({
        type: ACTION.LANGUAGE,
        payload: { khmer: false, english: true },
      });
    } else {
      setLocalStorage({ khmer: true, english: false })
      languageDispatch({
        type: ACTION.LANGUAGE,
        payload: { khmer: true, english: false },
      });
    }
    navigation.navigate("InputAccount");
  };

  return (
    <RootLog>
      <LinearGradient
        colors={["#36B34D", "rgba(190,226,197,0.48)"]}
        locations={[0.5, 0.9]}
      >
        <View style={styles.body}>
   
          <Image
            source={require("../assets/onlyLeaf.png")}
            style={styles.imageBg}
          />
          <View
            style={{
              // height: height*0.7
              alignItems: "center",
              paddingTop: 90,
            }}
          >
            <View>
              <Image
                source={require("../assets/LogoWhite.png")}
                style={styles.stretch}
              />
            </View>
          </View>
   
          <View
            style={{
              height: height * 0.18,
              position: "absolute",
              bottom: Platform.OS === "ios" ? 10 : 80,
              width: width,
              // backgroundColor: 'red',
            }}
          >
            <View style={styles.btn}>
              <GoButton
                style={{
                  backgroundColor: COLORS.PRIMARY,
                  width: "90%",
                  borderRadius: 7,
                }}
                color="white"
                title="ភាសាខ្មែរ"
                size={18}
                align="center"
                font={styleState.headKh}
                onPress={() => handleLanguage("kh")}
              />
              <GoButton
                style={{
                  backgroundColor: COLORS.PRIMARY,
                  width: "90%",
                  borderRadius: 7,
                  marginTop: 15,
                }}
                color="white"
                title="ENGLISH"
                size={18}
                align="center"
                font={styleState.headKh}
                onPress={() => handleLanguage("en")}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
     
    </RootLog>
  );
}
const styles = StyleSheet.create({
  body: {
    // height: Dimensions.get("screen").height,
    // flex: 1,
    height: "100%",
  },
  stretch: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
  },
  imageBg: {
    width: 250,
    height: 250,
    position: "absolute",
    left: -118,
    top: 20,
    opacity: 0.15,
  },
  btn: {
    alignItems: "center",
  },
});
export default  Login;