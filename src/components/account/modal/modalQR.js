import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { StyleController } from "../../../context/provider/styleProvider";
import Card from "../../card/card";
import { COLORS } from "../../../../color";
import Expend from "../expend";
import { DataController } from "../../../context/provider";
import { useQuery } from "@apollo/client";
import { QUERY_SUB_ACC } from "../../../gql/userInfo";
import { ACTION } from "../../../context/reducer";
import QRCode from "react-native-qrcode-svg";

export default function ModalQR({ navigation }) {
  // const { styleState, height, width } = useContext(StyleController);
  const { cardDBCtxDispatch, accountDBCtx, cardDBCtx, language } =
    useContext(DataController);

  const [modal, setModal] = useState(false);
  const [selectData, setSelectData] = useState({});
  const openModalQR = (e, data) => {
    setModal(e);
    setSelectData(data);

    // console.log(data)
  };

  const [dataSubUser, setDataSubUser] = useState([]);
  const {
    data: userDB,
    loading,
    refetch,
    error,
  } = useQuery(QUERY_SUB_ACC, {
    variables: {
      getSubCustomerByAccIdId: accountDBCtx?._id,
    },
  });
  // console.log(userDB);

  useEffect(() => {
    if (userDB) {
      refetch();
      cardDBCtxDispatch({
        type: ACTION.SUB_USER,
        payload: userDB?.getSubCustomerByAccId,
      });
      setDataSubUser(userDB?.getSubCustomerByAccId);
    }
  }, [userDB, accountDBCtx, modal]);
  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModal(!modal);
          }}
        >
          <View style={styles.bgModal} />
          <TouchableWithoutFeedback onPress={() => setModal(!modal)}>
            <View style={styles.centerModal}>
              <View style={styles.modalBox}>
                <QRCode value={selectData?.id} size={170} />

                <TouchableOpacity
                  onPress={() => {
                    setModal(false);
                    navigation?.navigate("Expend", { data: selectData });
                  }}
                  style={{
                    position: "absolute",
                    bottom: Platform.OS === "ios" ? 8 : 10,
                  }}
                >
                  <View style={styles.btnMore}>
                    {language?.english ? (
                      <Text style={styles.textMore}>More</Text>
                    ) : (
                      <Text style={styles.textMore}>បន្ទាប់</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {dataSubUser?.map((load) => (
          <TouchableOpacity
            key={load._id}
            onPress={() => openModalQR(true, load)}
          >
            <Card {...load} />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  modalBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    paddingBottom: 60,
  },
  btnMore: {
    padding: Platform.OS === "ios" ? 10 : 10,
    top: Platform.OS === "ios" ? 5 : 2,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
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
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
