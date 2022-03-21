import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StyleController } from "../../context/provider/styleProvider";
import { DataController } from "../../context/provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACTION } from "../../context/reducer";

export default function Welcome() {
  const { styleState, height, width } = useContext(StyleController);
  const { loginedDispatch, user, language } = useContext(DataController);

  useEffect(() => {
    let unmoted = false;
    setTimeout(async () => {
      if (!unmoted) {
        try {
          await AsyncStorage.setItem("@user", JSON.stringify(user));
          loginedDispatch({
            type: ACTION.LOGIN_USER,
            payload: true,
          });
        } catch (e) {
          // save error
        }
      }
    }, 2000);

    return () => {
      unmoted = true;
    };
  }, []);

  return (
    <ScrollView>
      <LinearGradient
        colors={["#36B34D", "rgba(190,226,197,0.48)"]}
        locations={[0.5, 0.9]}
      >
        <View style={styles.body}>
          <SafeAreaView>
            <Image
              source={require("../../assets/onlyLeaf.png")}
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
                  source={require("../../assets/LogoWhite.png")}
                  style={styles.stretch}
                />
              </View>
            </View>
          </SafeAreaView>
          {language?.english ? (
            <Text style={styles.title}>WELCOME TO GO CREDIT</Text>
          ) : (
            <Text style={styles.titleKh}>សូមស្វាគមន៍</Text>
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  body: {
    height: Dimensions.get("screen").height,
  },
  stretch: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
    marginTop: 60,
  },
  imageBg: {
    width: 250,
    height: 250,
    position: "absolute",
    left: -118,
    top: 20,
    opacity: 0.15,
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
    letterSpacing: 1.5,
  },
  titleKh: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
    fontFamily: "Khmer OS Muol Light",
  },
});
