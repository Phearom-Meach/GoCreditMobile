import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../../color";
import { CheckBox } from "react-native-elements";
import { DataController } from "../../../context/provider";
import { GoButton } from "../../../static/own-comp";
import { StyleController } from "../../../context/provider/styleProvider";
import { ACTION } from "../../../context/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignOut() {
  const { userDispatch, loginedDispatch, language, notiNumDispatch } =
    useContext(DataController);
  const { styleState, height, width } = useContext(StyleController);
  const [openModalSignOut, setOpenModalSignOut] = useState(false);

  const signOutFn = async () => {
    await AsyncStorage.clear();
    await AsyncStorage.removeItem("@login");
    notiNumDispatch({
      type: ACTION.NOTINUM,
      payload: [],
    });
    try {
      loginedDispatch({
        type: ACTION.LOGIN_USER,
        payload: false,
      });
      userDispatch({
        type: ACTION.LOGOUT_USER,
      });
      return true;
    } catch (e) {
      // remove error
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={openModalSignOut}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setOpenModalSignOut(!openModalSignOut);
        }}
      >
        <View style={styles.bgModal} />
        <TouchableWithoutFeedback
          onPress={() => setOpenModalSignOut(!openModalSignOut)}
        >
          <View style={styles.centerModal}>
            <View style={styles.modalBox}>
              <View style={styles.titleLanguage}>
                {language?.english ? (
                  <Text style={styles.textLangauge}>
                    Do you want to SignOut ?
                  </Text>
                ) : (
                  <Text style={styles.textLangauge}>
                    តើអ្នកចង់ចាកចេញពីកម្មវិធីទេ?
                  </Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  padding: Platform.OS === "ios" ? 25 : 25,
                }}
              >
                {language?.english ? (
                  <GoButton
                    style={{
                      backgroundColor: "#8888",
                      width: "40%",
                      borderRadius: 5,
                      height: 45,
                      right: 15,
                    }}
                    color="white"
                    title="CANCEL"
                    size={16}
                    align="center"
                    font={styleState.headKh}
                    bottom={3}
                    onPress={() => setOpenModalSignOut(!openModalSignOut)}
                  />
                ) : (
                  <GoButton
                    style={{
                      backgroundColor: "#8888",
                      width: "40%",
                      borderRadius: 5,
                      height: 45,
                      right: 15,
                    }}
                    color="white"
                    title="មិនចាកចេញ"
                    size={16}
                    align="center"
                    font={styleState.bodyKh}
                    bottom={3}
                    onPress={() => setOpenModalSignOut(!openModalSignOut)}
                  />
                )}

                {language?.english ? (
                  <GoButton
                    style={{
                      backgroundColor: COLORS.PRIMARY,
                      width: "40%",
                      borderRadius: 5,
                      height: 45,
                      left: 15,
                    }}
                    color="white"
                    title="SIGN OUT"
                    size={16}
                    align="center"
                    font={styleState.headKh}
                    bottom={3}
                    onPress={() => signOutFn()}
                  />
                ) : (
                  <GoButton
                    style={{
                      backgroundColor: COLORS.PRIMARY,
                      width: "40%",
                      borderRadius: 5,
                      height: 45,
                      left: 15,
                    }}
                    color="white"
                    title="ចាកចេញ"
                    size={16}
                    align="center"
                    font={styleState.bodyKh}
                    bottom={3}
                    onPress={() => signOutFn()}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableOpacity onPress={() => setOpenModalSignOut(!openModalSignOut)}>
        <View style={styles.listDown}>
          <AntDesign
            name="logout"
            size={22}
            color="#A3A6A9"
            style={{ margin: 9, top: 3 }}
          />
          {language?.english ? (
            <Text style={styles.text}>Sign out</Text>
          ) : (
            <Text style={styles.text}>ចាកចេញ</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: Platform.OS === "ios" ? 300 : 290,
    height: Platform.OS === "ios" ? 150 : 150,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
  },
  bgModal: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
  },
  titleLanguage: {
    backgroundColor: COLORS.PRIMARY,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textLangauge: {
    color: "#FFFF",
    fontSize: 18,
    padding: 12,
  },
  listDown: {
    borderBottomWidth: 1,
    width: "100%",
    borderColor: "#ddd",
    height: 50,
    flexDirection: "row",
  },
  text: {
    color: "black",
    fontSize: 16,
    margin: 8,
    top: 5,
  },
});
