import React, { useState, useContext } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { StyleController } from "../../../context/provider/styleProvider";
import Header4 from "../../../routes/header/header4";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../../color";
import { DataController } from "../../../context/provider";

export default function TermNConditions() {
  const { height, width, styleState } = useContext(StyleController);
  const { language } = useContext(DataController);
  const [modalExchange, setModalExchange] = useState(false);
  const [selectExchange, setSelectExchange] = useState({});
  const openModalExchange = (e, data) => {
    setModalExchange(e);
    setSelectExchange(data);
    // console.log(data)
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalExchange}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalExchange(!modalExchange);
        }}
      >
        <Header4
          title={"Term and Conditions"}
          onPress={() => setModalExchange(!modalExchange)}
        />

        <View
          style={{
            // height: height * 1,
            height:
              Platform.OS === "ios"
                ? Dimensions.get("screen").height - 70
                : Dimensions.get("screen").height - 130,
            width: width * 1,
            backgroundColor: COLORS.MAIN,
            padding: 15,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {language?.english ? (
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                Go Credit Term and Conditions
              </Text>
            ) : (
              <Text style={{ alignSelf: "center", fontSize: 22 }}>
                លក្ខខណ្ឌ ហ្គោក្រេឌីត
              </Text>
            )}

            <View style={{ top: 20 }}>
              <Text style={{ fontSize: 14 }}>
                <Text style={{ fontWeight: "bold", textAlign: "justify" }}>
                  {" "}
                  - Go Credit:
                </Text>{" "}
                means an application for a smartphone that can be download by
                you from following application from App Store or Google Play.
              </Text>

              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>- Go Credit Pay:</Text>{" "}
                means a mobile based payment facility enabling Go Credit Mobile
                users to make payments or purchases from their Go Credit account
                at store or merchants by scaning compatible Quick Response (QR)
                code.
              </Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>
                  - Go Credit Pay Place:
                </Text>{" "}
                means a list of sales point including in Go Global School
                Cafeterial and Go Global Mart accepting Go Credit payment.
              </Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>- Account:</Text> means Go
                Credit Deposit and Withdraw Accounts in both KHR and USD
                currencies as may be created from time to time at Go Credit PLC.
              </Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>- Card:</Text> mean Go
                Credit Card have Quick Response (QR) code for payment.
              </Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>
                  - Go Credit Mobile ID:
                </Text>{" "}
                means a unique of the identification number assigned to each Go
                Gredit Mobile user during registration.
              </Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>- Mobile Operator:</Text>{" "}
                means a participating mobile telephone network operator.
              </Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>- Notification:</Text>{" "}
                means in-app push-notification sent to you on different
                occastion related to transaction.
              </Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>- PIN:</Text> means the
                unique four (4) digit number used to log in to Go Credit Mobile.
              </Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>- Contact Us:</Text> Users
                can contact Go Credit 's Customer Support Center 24/7 via
                integrated Facebook messager or call-in-to our hotline number.
              </Text>
              <Text style={{ fontSize: 14, textAlign: "justify" }}>
                <Text style={{ fontWeight: "bold" }}>- Settings:</Text> User can
                view personal information and manage settings in the application
                that includes changing Address, changing PIN.
                {"\n"}
                {"\n"}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => openModalExchange(true)}>
        <View style={styles.listDown}>
          <MaterialIcons
            name="file-copy"
            size={22}
            color="#A3A6A9"
            style={{ margin: 9, top: 3 }}
          />
          {language?.english ? (
            <Text style={styles.text}>Term & Conditions</Text>
          ) : (
            <Text style={styles.text}>លក្ខខណ្ឌ</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
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
});
