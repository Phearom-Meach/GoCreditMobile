import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../../color";
import { CheckBox } from "react-native-elements";
import { DataController } from "../../../context/provider";
import { ACTION } from "../../../context/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Language = () => {
  const { language, languageDispatch } = useContext(DataController);
  const [openModalLangauge, setOpenModalLangauge] = useState(false);

  const setLocalStorage = async (val) => {
    await AsyncStorage.setItem("@language", JSON.stringify(val));
  };

  const handleLanguage = (item) => {
    if (item === "en") {
      setLocalStorage({ khmer: false, english: true });
      languageDispatch({
        type: ACTION.LANGUAGE,
        payload: { khmer: false, english: true },
      });
    } else {
      setLocalStorage({ khmer: true, english: false });
      languageDispatch({
        type: ACTION.LANGUAGE,
        payload: { khmer: true, english: false },
      });
    }
  };
  return (
    <View style={{ width: "100%" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={openModalLangauge}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setOpenModalLangauge(!openModalLangauge);
        }}
      >
        <View style={styles.bgModal} />
        <TouchableWithoutFeedback
          onPress={() => setOpenModalLangauge(!openModalLangauge)}
        >
          <View style={styles.centerModal}>
            <View style={styles.modalBox}>
              <View style={styles.titleLanguage}>
                {language?.english ? (
                  <Text style={styles.textLangauge}>Languages</Text>
                ) : (
                  <Text style={styles.textLangauge}>ភាសា</Text>
                )}
              </View>
              <View style={styles.conCheckbox}>
                <CheckBox
                  title="English"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={language.english}
                  onPress={() => handleLanguage("en")}
                />
              </View>
              <View style={styles.conCheckbox}>
                <CheckBox
                  title="ភាសាខ្មែរ"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={language.khmer}
                  onPress={() => handleLanguage("kh")}
                />
              </View>
              {/* <View style={styles.conCheckbox}>
                <CheckBox 
                  title='Chinese'
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={isCheck==="ch"?true: false}
                  onPress={()=>setIsCheck("ch")}
                  />
              </View> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity
        onPress={() => setOpenModalLangauge(!openModalLangauge)}
      >
        <View style={styles.listDown}>
          <AntDesign
            name="earth"
            size={22}
            color="#A3A6A9"
            style={{ margin: 9, top: 3 }}
          />
          {language?.english ? (
            <Text style={styles.text}>English</Text>
          ) : (
            <Text style={styles.text}>ភាសាខ្មែរ</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    // margin: 20,
    width: Platform.OS === "ios" ? 300 : 290,
    height: Platform.OS === "ios" ? 190 : 190,
    backgroundColor: "white",
    borderRadius: 10,
    //   padding: 30,
    alignItems: "center",
    shadowColor: "#000",
  },
  btnMore: {
    //   padding: 10,
    //   top: 10,
    backgroundColor: "red",
    //   borderRadius: 5,
  },
  textMore: {
    color: "white",
    fontSize: 18,
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
  conCheckbox: {
    width: "100%",
    // backgroundColor: "red"
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default Language;
