import React, { useState, useContext } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { DataController } from "../../../context/provider";

const AlertModal = ({ success, setSuccess, error, message, khMessage }) => {
  const { language } = useContext(DataController);
  //  console.log(success,'kk')
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={success}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setSuccess(!success);
        }}
      >
        <View style={styles.bgModal} />
        {/* <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}> */}
        <View style={styles.centerModal}>
          <View style={styles.modalBox}>
            <View style={styles.bgIcon}>
              {error ? (
                <AntDesign
                  name="checkcircle"
                  size={100}
                  color="#3dcf58"
                  style={{ alignSelf: "center", padding: 10, top: 20 }}
                />
              ) : (
                <Entypo
                  name="circle-with-cross"
                  size={100}
                  color="red"
                  style={{ alignSelf: "center", padding: 10, top: 5 }}
                />
              )}
              {language?.english ? (
                <View style={{ alignSelf: "center", padding: 5 }}>
                  {error ? (
                    <Text style={{ fontSize: 22, color: "black", top: 15 }}>
                      {message}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 18, color: "red" }}>
                      {message}
                    </Text>
                  )}
                </View>
              ) : (
                <View style={{ alignSelf: "center", padding: 5 }}>
                  {error ? (
                    <Text style={{ fontSize: 22, color: "black", top: 15 }}>
                      {khMessage}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 18, color: "red" }}>
                      {khMessage}
                    </Text>
                  )}
                </View>
              )}
            </View>
            {/* <View style={styles.borderStyle}/> */}
            <TouchableOpacity
              onPress={() => {
                setSuccess(false);
              }}
              style={{
                ...styles.btnOK,
                backgroundColor: error ? "#36B34D" : "gray",
              }}
            >
              {error ? (
                <Text
                  style={{
                    alignSelf: "center",
                    padding: 10,
                    fontSize: 18,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  OK
                </Text>
              ) : (
                <Text
                  style={{
                    alignSelf: "center",
                    padding: 10,
                    fontSize: 18,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Close
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  bgIcon: {
    width: "100%",
    height: Platform.OS === "ios" ? 120 : 120,
    // backgroundColor: "pink",
    alignSelf: "center",
    position: "absolute",
    top: 0,
  },
  btnOK: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 8 : 10,

    width: 300,
    height: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    bottom: 0,
  },
  borderStyle: {
    width: 300,
    height: 2,
    backgroundColor: "#36B34D",
    position: "absolute",
    bottom: 40,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  bgModal: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
  },
  centerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  modalBox: {
    width: 300,
    height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    // paddingBottom: 40,
  },
});

export default AlertModal;
