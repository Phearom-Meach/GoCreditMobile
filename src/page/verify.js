import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  SafeAreaView,
  Alert,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { StyleController } from "../context/provider/styleProvider";
import { DataController } from "../context/provider";
import { CircleCover } from "../static/circle-comp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACTION } from "../context/reducer";
import { CREATE_ACC_LOGIN, UPDATE_USER } from "../gql/userInfo";
import { useMutation } from "@apollo/client";
import Root from "./root";

export default function Verify({ navigation,route }) {
  const { user, accountDBCtx, language } = useContext(DataController);
  const [digitpin, setDigiPin] = useState("");
  const {data} = route.params;
  const Data = data;

  const [loginMobileUser, { loading }] = useMutation(CREATE_ACC_LOGIN, {
    onError: (e) => {
      console.log(e.message);
      Alert.alert("Incorrect PIN");
    },

  });

  const onchangeDigit = async (e) => {
    setDigiPin(e);
    // console.log(e.length)
    if (e.length === 4) {
      // console.log(e)
      await loginMobileUser({
        variables: {
          input: {
            accountNumber: accountDBCtx?.accountNumber?.toString(),
            pin: e,
          },
        },
        update(_, result) {
          if (result?.data?.loginMobileUser?.success) {
            navigation.navigate(Data);
          } else {
            Alert.alert(result?.data?.loginMobileUser?.message);
          }
        },
      });
     
    }
  
  };


  return (
    <LinearGradient
      colors={["#baf8c6", "rgba(54,179,77,1) 100%"]}
      locations={[0, 0.5]}
    >
      <SafeAreaView>
        <View
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
          }}
        >
          {language?.english ? (
            <Text
              style={{
                padding: Platform.OS === "ios" ? 20 : 15,
                color: "white",
                fontSize: 16,

                alignItems: "center",
                top: Platform.OS === "ios" ? 5 : 5,
              }}
              onPress={() => navigation.goBack()}
            >
              Cancel
            </Text>
          ) : (
            <Text
              style={{
                padding: Platform.OS === "ios" ? 20 : 15,
                color: "white",
                fontSize: 16,

                alignItems: "center",
                top: Platform.OS === "ios" ? 5 : 5,
              }}
              onPress={() => navigation.goBack()}
            >
              ចាកចេញ
            </Text>
          )}

          <View style={{ height: Platform.OS === "ios" ? "19%" : "18%" }}>
            <CircleCover
              icon={
                <Feather
                  name="key"
                  size={Platform.OS === "ios" ? 45 : 40}
                  color="#2C2C2C"
                />
              }
            />
          </View>

          <View style={styles.title}>
            {language?.english ? (
              <Text style={styles.subTitle}>Enter PIN to comfirm</Text>
            ) : (
              <Text style={styles.subTitle}>បញ្ចូលកូដ PIN បញ្ចាក់</Text>
            )}
          </View>

          <View style={styles.code}>
            <View style={styles.allBox}>
              <View style={styles.Box}>
                <Text style={styles.text}>{digitpin.charAt(0) && "*"}</Text>
              </View>
              <View style={styles.Box}>
                <Text style={styles.text}>{digitpin.charAt(1) && "*"}</Text>
              </View>
              <View style={styles.Box}>
                <Text style={styles.text}>{digitpin.charAt(2) && "*"}</Text>
              </View>
              <View style={styles.Box}>
                <Text style={styles.text}>{digitpin.charAt(3) && "*"}</Text>
              </View>
            </View>
            <TextInput
              value={digitpin}
              style={styles.inputCode}
              caretHidden={true}
              keyboardType="number-pad"
              // keyboardType="default"
              secureTextEntry
              autoFocus
              maxLength={4}
              onChangeText={(e) => onchangeDigit(e)}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'yellow'
  },
  subTitle: {
    fontSize: 18,
    color: "white",
  },
  TextTitles: {
    fontSize: 14,
    color: "black",
    marginVertical: 5,
  },
  inputCode: {
    width: "50%",
    height: 35,
    backgroundColor: "transparent",
    // backgroundColor: "pink",
    // opacity: 0.5,
    color: "transparent",
    marginTop: 14,
    position: "absolute",
  },
  code: {
    alignItems: "center",
  },
  Box: {
    width: Platform.OS === "ios" ? 25 : 25,
    height: Platform.OS === "ios" ? 25 : 25,
    backgroundColor: "white",
    margin: 8,
    borderRadius: 30,
    // fontSize: 22,
  },
  allBox: {
    flexDirection: "row",
    marginTop: 20,
  },

  text: {
    // padding: 0,
    // textAlign: "center",
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    bottom: Platform.OS === "ios" ? 0 : 4,
    alignItems: "center",
  },

  // btn: {
  //   alignItems: "center",
  // },
  container: {
    alignItems: "center",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});
