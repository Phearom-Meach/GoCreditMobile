import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { StyleController } from "../../../../context/provider/styleProvider";
import { COLORS } from "../../../../../color";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import EditContact from "../editContact";
import { SafeAreaView } from "react-navigation";
import { DataController } from "../../../../context/provider";
import { ACTION } from "../../../../context/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoButton } from "../../../../static/own-comp";
import { UPDATE_USER } from "../../../../gql/userInfo";
import { useMutation } from "@apollo/client";
import { FontAwesome } from "@expo/vector-icons";

export default function EditProfile({ open, setOpen, data }) {
  const { height, width, styleState } = useContext(StyleController);
  const { user, accountDBCtx, accountDBCtxDispatch, language } =
    useContext(DataController);

  const [address, setAddress] = useState({
    city: "",
    district: "",
    commune: "",
    village: "",
    houseNo: "",
    streetNo: "",
  });

  const setLocalStorage = async (value) => {
    await AsyncStorage.setItem("@login", JSON.stringify(value));
  };
  const [updateMobileUser, { loading }] = useMutation(UPDATE_USER, {
    onError: (e) => {
      console.log(e.message);
    },
    // onCompleted : ({updateMobileUser}) => {
    //   console.log(updateMobileUser)
    // }
  });
  const UpdateAddress = async () => {
    setOpen(!open);
    await updateMobileUser({
      variables: {
        input: {
          _id: accountDBCtx?._id,
          location: address,
        },
      },
      update(_, result) {
        accountDBCtxDispatch({
          type: ACTION.LOGIN_USER,
          payload: result?.data?.updateMobileUser?.userData,
        });
        setLocalStorage(result?.data?.updateMobileUser?.userData);
        // console.log(result?.data?.updateMobileUser?.userData, "hello")
      },
    });
  };
  // console.log(accountDBCtx, 'jjj');
  useEffect(() => {
    setAddress({
      city: accountDBCtx?.location?.city,
      district: accountDBCtx?.location?.district,
      commune: accountDBCtx?.location?.commune,
      village: accountDBCtx?.location?.village,
      houseNo: accountDBCtx?.location?.houseNo,
      streetNo: accountDBCtx?.location?.streetNo,
    });
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setOpen(!open);
      }}
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.select({ ios: 0, adroid: 500 })}
        >
          <ScrollView>
            <View
              style={{
                minHeight: styleState.fullScreen,

                width: "100%",
                backgroundColor: COLORS.MAIN,
              }}
            >
              <LinearGradient
                colors={["#baf8c6", "rgba(54,179,77,1) 100%"]}
                locations={[0.01, 0.9]}
                style={{
                  height: Platform.OS === "ios" ? height * 0.32 : height * 0.31,
                }}
              >
                <TouchableOpacity onPress={() => setOpen(!open)}>
                  <View
                    style={{
                      width: width * 0.15,
                      alignItems: "center",
                      height: 50,
                    }}
                  >
                    <Entypo
                      name="cross"
                      size={35}
                      color="white"
                      style={{
                        position: "absolute",
                        top: Platform.OS === "ios" ? 10 : 5,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.container}>
                  <FontAwesome
                    name="user-circle"
                    size={100}
                    color="#ffffff"
                    style={{ textAlign: "center" }}
                  />

                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "#ffffff",
                      top: 8,
                      fontWeight: "bold",
                    }}
                  >
                    {accountDBCtx?.firstName.toUpperCase() +
                      "  " +
                      accountDBCtx?.lastName.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: "#ffffff",
                      top: 10,
                    }}
                  >
                    Account Number: {accountDBCtx?.accountNumber}
                  </Text>
                  {/* </View> */}
                </View>
              </LinearGradient>
              <View>
                <View style={styles.head}>
                  {language?.english ? (
                    <Text
                      style={{
                        fontSize: 16,
                        padding: Platform.OS === "ios" ? 3 : 2,
                        left: 20,
                      }}
                    >
                      Address
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        padding: Platform.OS === "ios" ? 3 : 2,
                        left: 20,
                      }}
                    >
                      អាសយដ្ឋាន
                    </Text>
                  )}
                </View>

                {/* <EditContact data={updateData} setData={setUpdateData} /> */}
                <EditContact address={address} setAddress={setAddress} />
              </View>
              <View style={{ alignItems: "center" }}>
                {language?.english ? (
                  <GoButton
                    style={{
                      backgroundColor: COLORS.PRIMARY,
                      width: "90%",
                      borderRadius: 7,
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                    color="white"
                    title="SAVE"
                    size={18}
                    align="center"
                    font={styleState.SegoeUI}
                    fontWeight="bold"
                    onPress={() => UpdateAddress()}
                  />
                ) : (
                  <GoButton
                    style={{
                      backgroundColor: COLORS.PRIMARY,
                      width: "90%",
                      borderRadius: 7,
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                    color="white"
                    title="រក្សាទុក"
                    size={18}
                    align="center"
                    font={styleState.bodyKh}
                    fontWeight="bold"
                    onPress={() => UpdateAddress()}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  listDown: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    height: 50,
    flexDirection: "row",
    // backgroundColor: 'pink'
  },
  text: {
    fontSize: 16,
    margin: 8,
    top: 5,
  },
  info: {
    padding: 20,
  },
  profile: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  head: {
    width: "100%",
    height: Platform.OS === "ios" ? 30 : 28,
    backgroundColor: "#DEDEDE",
  },
  content: {
    top: Platform.OS === "ios" ? 10 : 10,
  },
  container: {
    // padding: 5,
    // top: Platform.OS === "ios" ? 25 : 35,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 25,
    alignSelf: "center",
  },
  profile: {
    alignSelf: "center",
    // top: 15,
  },
});
