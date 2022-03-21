import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { StyleController } from "../../context/provider/styleProvider";
import { GoButton } from "../../static/own-comp";
import { COLORS } from "../../../color";
import { DataController } from "../../context/provider";
import RootLog from "../../page/rootLog";
import { useMutation } from "@apollo/client";
import { CREATE_ACC_LOGIN } from "../../gql/userInfo";
import { ACTION } from "../../context/reducer";
// import { accountDB } from '../../assets/data/accountDB'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InputAccount({ navigation }) {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx, accountDBCtxDispatch, language } =
    useContext(DataController);

  const [loginMobileUser] = useMutation(CREATE_ACC_LOGIN, {
    onError: (e) => {
      console.log(e.message);
    },
  });

  const [account, setAccount] = useState();
  const [pin, setPin] = useState();

  const setLocalStorage = async (value) => {
    await AsyncStorage.setItem("@login", JSON.stringify(value));
  };

  const HandleNext = async () => {
    // console.log(typeof(pin));
    await loginMobileUser({
      variables: {
        input: {
          accountNumber: account,
          pin: pin,
        },
      },
      update(_, result) {
        // console.log(result?.data?.loginMobileUser,"jj")
        if (result?.data?.loginMobileUser?.success) {
          accountDBCtxDispatch({
            type: ACTION.LOGIN_USER,
            payload: result?.data?.loginMobileUser?.userData,
          });
          setLocalStorage(result?.data?.loginMobileUser?.userData);
          navigation.navigate("Welcome");
        } else {
          language?.english
            ? Alert.alert(result?.data?.loginMobileUser?.message)
            : Alert.alert(result?.data?.loginMobileUser?.khMessage);
        }
      },
    });
  };

  return (
    <RootLog>
      <View style={styles.body}>
        <View
          style={{
            height: Platform.OS === "ios" ? height * 0.3 : height * 0.27,
            backgroundColor: "#36B34D",
          }}
        >
          <Image
            source={require("../../assets/onlyLeaf.png")}
            style={styles.imageBg}
          />
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: Platform.OS === "ios" ? 20 : 15,
            }}
          >
            <View>
              <Image
                source={require("../../assets/LogoWhite.png")}
                style={styles.stretch}
              />
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View>
            {language?.english ? (
              <Text style={styles.text1}>Account Number</Text>
            ) : (
              <Text style={styles.text1}>លេខគណនី</Text>
            )}
            {language?.english ? (
              <TextInput
                style={styles.input}
                placeholder="Enter your account number"
                keyboardType="numeric"
                onChangeText={(e) => setAccount(e)}
                value={account}
              />
            ) : (
              <TextInput
                style={styles.input}
                placeholder="បញ្ចូលលេខគណនី"
                keyboardType="numeric"
                onChangeText={(e) => setAccount(e)}
                value={account}
              />
            )}

            {language?.english ? (
              <Text style={styles.text2}>Input PIN</Text>
            ) : (
              <Text style={styles.text2}>បញ្ចូលលេខសម្ងាត់</Text>
            )}
            {language?.english ? (
              <TextInput
                style={styles.input}
                placeholder="PIN"
                value={pin}
                editable={true}
                secureTextEntry
                maxLength={4}
                keyboardType="numeric"
                onChangeText={(e) => setPin(e)}
              />
            ) : (
              <TextInput
                style={styles.input}
                placeholder="លេខសម្ងាត់"
                value={pin}
                editable={true}
                secureTextEntry
                maxLength={4}
                keyboardType="numeric"
                onChangeText={(e) => setPin(e)}
              />
            )}
          </View>

          <View
            style={{
              position: "absolute",
              bottom: Platform.OS === "ios" ? 20 : 90,
              width: width,
            }}
          >
            <View style={styles.btn}>
              {language?.english ? (
                <GoButton
                  style={{
                    backgroundColor: account === "" ? "#888" : COLORS.PRIMARY,
                    width: "90%",
                    borderRadius: 7,
                  }}
                  color="white"
                  title="NEXT"
                  size={18}
                  align="center"
                  font={styleState.headKh}
                  // disabled={account ? false : true}
                  onPress={() =>
                    // navigation.navigate("PhoneNumber", { account: account })
                    HandleNext()
                  }
                />
              ) : (
                <GoButton
                  style={{
                    backgroundColor: account === "" ? "#888" : COLORS.PRIMARY,
                    width: "90%",
                    borderRadius: 7,
                  }}
                  color="white"
                  title="បន្ទាប់"
                  size={18}
                  align="center"
                  font={styleState.bodyKh}
                  // disabled={account ? false : true}
                  onPress={() =>
                    // navigation.navigate("PhoneNumber", { account: account })
                    HandleNext()
                  }
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </RootLog>
  );
}
const styles = StyleSheet.create({
  body: {
    // height: Dimensions.get("screen").height,
    minHeight: "100%",
  },
  stretch: {
    width: Platform.OS === "ios" ? 150 : 140,
    height: Platform.OS === "ios" ? 150 : 140,
    resizeMode: "stretch",
  },
  imageBg: {
    width: Platform.OS === "ios" ? 200 : 190,
    height: Platform.OS === "ios" ? 200 : 190,
    position: "absolute",
    left: -95,
    top: 10,
    opacity: 0.2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "rgba(171,171,171,0.24)",
    padding: Platform.OS === "ios" ? 10 : 6,
    fontSize: 16,
    borderRadius: 6,
    width: "90%",
    fontFamily: "SegoeUI",
    alignSelf: "center",
    color: "black",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 15,
    backgroundColor: "#ffff",
  },
  text1: {
    marginLeft: 20,
    marginBottom: 7,
    fontSize: 16,
    fontFamily: "SegoeUI",
  },
  text2: {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 7,
    fontSize: 16,
    fontFamily: "SegoeUI",
  },
  btn: {
    alignItems: "center",
  },
  errorMsg: {
    color: "red",
    marginTop: 7,
    marginLeft: 20,
  },
});
