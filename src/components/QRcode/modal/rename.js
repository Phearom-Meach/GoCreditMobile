import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { cardDB } from "../../../assets/data/cardDB";
import { COLORS } from "../../../../color";
import { DataController } from "../../../context/provider";
import { ACTION } from "../../../context/reducer";
import { UPDATE_SUB_USER } from "../../../gql/userInfo";
import { useMutation } from "@apollo/client";

export default function RenameModal({ data }) {
  const { language } = useContext(DataController);

  const [dataDB, setDataDB] = useState();
  const [modalRename, setModalRename] = useState(false);
  const [selectRename, setSelectRename] = useState({});
  const openModalRename = (e, value) => {
    setModalRename(e);
    setSelectRename(data);
  };

  const [rename, setRename] = useState({
    firstName: "",
    lastName: "",
    englishName: "",
  });
  const [updateSubCustomer, { loading }] = useMutation(UPDATE_SUB_USER, {
    onError: (e) => {
      console.log(e.message);
    },
    // onCompleted : ({updateMobileUser}) => {
    //   console.log(updateMobileUser)
    // }
  });
  const UpdateSubUser = async () => {
    await updateSubCustomer({
      variables: {
        input: {
          id: selectRename?.id,
          firstName: rename?.firstName,
          lastName: rename?.lastName,
          englishName: rename?.englishName,
        },
      },
      update(_, result) {
        setModalRename(!modalRename);
      },
    });
  };
  useEffect(() => {
    setRename({
      firstName: selectRename?.firstName,
      lastName: selectRename?.lastName,
      englishName: selectRename?.englishName,
    });
  }, [data, modalRename]);

  //   const reName = (e) =>{

  //     cardDBCtxDispatch({
  //       type: ACTION.SUB_USER,
  //       payload: selectRename
  //     })

  // // console.log(selectRename)
  //   }
  // console.log(rename, "hey")

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalRename}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalRename(!modalRename);
        }}
      >
        <View style={styles.bgModal} />
        <TouchableWithoutFeedback onPress={() => setModalRename(!modalRename)}>
          <View style={styles.centerModal}>
            <View style={styles.modalBox}>
              <View style={styles.boxRename}>
                <Text style={styles.title}>Rename</Text>
              </View>
              <View>
                <View style={styles.topBox}>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: "center",
                      color: "#808080",
                    }}
                  >
                    Enter the FullName
                  </Text>
                </View>
                <View style={styles.editBox1}>
                  <FontAwesome5
                    name="pencil-alt"
                    size={18}
                    color="#A3A6A9"
                    style={styles.renameIcon}
                  />
                  <TextInput
                    value={rename?.englishName?.toUpperCase()}
                    style={{ fontSize: 16, width: "100%" }}
                    onChangeText={(e) =>
                      setRename((ele) => {
                        return {
                          ...ele,
                          englishName: e,
                        };
                      })
                    }
                  />
                </View>
              </View>
              <View style={styles.btnAll}>
                <TouchableOpacity onPress={() => setModalRename(!modalRename)}>
                  <View style={styles.btnCancel}>
                    <Text style={{ textAlign: "center", top: 8, fontSize: 14 }}>
                      CANCEL
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => UpdateSubUser()}>
                  <View style={styles.btnOk}>
                    <Text
                      style={{
                        textAlign: "center",
                        top: 8,
                        color: COLORS.MAIN,
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      OK
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableOpacity onPress={() => openModalRename(true)}>
        <View style={styles.listDown}>
          <FontAwesome5
            name="pencil-alt"
            size={18}
            color="#A3A6A9"
            style={styles.icon}
          />
          <Text style={styles.text}>Rename</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  listDown: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    height: 40,
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    margin: 9,
  },
  icon: {
    margin: 9,
  },
  bgModal: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    opacity: 0.75,
    position: "absolute",
  },
  centerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: Platform.OS === "ios" ? 350 : 350,
    // height: "auto",
    height: Platform.OS === "ios" ? 200 : 200,
    backgroundColor: "white",
    borderRadius: 10,
    // alignItems: "center",
    shadowColor: "#000",
  },
  boxRename: {
    height: 45,
    backgroundColor: COLORS.PRIMARY,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 18,
    color: COLORS.MAIN,
    alignSelf: "center",
    padding: 10,
    fontWeight: "bold",
  },
  editBox1: {
    height: 50,
    width: "85%",
    alignSelf: "center",
    top: 10,
    borderColor: COLORS.YELLOW,
    borderWidth: 1.5,
    borderRadius: 5,
    flexDirection: "row",
    // backgroundColor:'pink'
  },
  editBox2: {
    height: 50,
    width: "85%",
    alignSelf: "center",
    top: 15,
    borderColor: COLORS.YELLOW,
    borderWidth: 1.5,
    borderRadius: 5,
    flexDirection: "row",
    // backgroundColor:'pink'
  },
  renameIcon: {
    margin: 15,
  },
  topBox: {
    top: 17,
    position: "relative",
    backgroundColor: "white",
    width: 130,
    left: 40,
    zIndex: 1000,
  },
  secondBox: {
    top: 23,
    position: "relative",
    backgroundColor: "white",
    width: 130,
    left: 40,
    zIndex: 1000,
  },
  btnAll: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    right: 30,
  },
  btnCancel: {
    width: 90,
    height: 35,
    backgroundColor: "#DCDCDC",
    borderRadius: 6,
    right: 15,
  },
  btnOk: {
    width: 80,
    height: 35,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 6,
  },
});
