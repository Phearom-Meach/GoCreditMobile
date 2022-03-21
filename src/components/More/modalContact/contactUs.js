import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import { StyleController } from "../../../context/provider/styleProvider";
import { COLORS } from "../../../../color";
import { Feather } from "@expo/vector-icons";
import Header4 from "../../../routes/header/header4";
import { LinearGradient } from "expo-linear-gradient";
import { CircleCover } from "../../../static/circle-comp";
import { GoButton } from "../../../static/own-comp";
import * as Linking from "expo-linking";
import { DataController } from "../../../context/provider";
import { COMPANY_CONTACT } from "../../../gql/userInfo";
import { useQuery } from "@apollo/client";

export default function ContactUs() {
  const { height, width, styleState } = useContext(StyleController);
  const { language } = useContext(DataController);
  const [modalExchange, setModalExchange] = useState(false);
  const [selectExchange, setSelectExchange] = useState({});
  const [phone, setPhone] = useState("");

  const openModalExchange = (e, data) => {
    setModalExchange(e); 
    setSelectExchange(data);
    // console.log(data)
  };

  const { data } = useQuery(COMPANY_CONTACT);

  useEffect(() => {
    setPhone(data?.getCompanyContact?.data[0]?.phoneNumber);
  }, []);

  const handleOpenWithLinking = () => {
    // Linking.openURL(Platform.OS === 'ios' ? 'fb://profile/190999004268363':'fb://page/190999004268363');
    Linking.openURL(data?.getCompanyContact?.data[0]?.facebook);
  };
  const callWithLinking = () => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View>
      <SafeAreaView>
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
            title={"Go Credit Pay Place"}
            onPress={() => setModalExchange(!modalExchange)}
          />

          <View
            style={{
              height: Dimensions.get("screen").height,
              width: width * 1,
              backgroundColor: COLORS.MAIN,
            }}
          >
            <LinearGradient
              colors={["#D9F6DF", "rgba(83,196,104,1) 0%"]}
              locations={[0.1, 0.9]}
            >
              <View style={{ top: 20, alignSelf: "center" }}>
                <CircleCover
                  icon={<Feather name="phone-call" size={45} color="#2C2C2C" />}
                />

                <View
                  style={{
                    position: "absolute",
                    top: Platform.OS === "ios" ? 140 : 130,
                    alignSelf: "center",
                  }}
                >
                  {language?.english ? (
                    <Text style={{ fontSize: 18, alignSelf: "center" }}>
                      Do you need help?
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 18, alignSelf: "center" }}>
                      តើអ្នកត្រូវការជំនួយទេ?
                    </Text>
                  )}
                  {language?.english ? (
                    <Text style={{ fontSize: 16, marginVertical: 10 }}>
                      Please contact us by anyway below:
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 16, marginVertical: 10 }}>
                      សូមទាក់ទងមកយើងខ្ញុំតាមរយៈបណ្ដាញណាមួយខាងក្រោម:
                    </Text>
                  )}
                </View>
              </View>
            </LinearGradient>
          </View>
          <View
            style={{
              // height: height*0.3
              position: "absolute",
              bottom: 20,
              width: width,
              zIndex: 1000,
            }}
          >
            <View style={styles.btn}>
              {language?.english ? (
                <GoButton
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    width: "90%",
                    borderRadius: 7,
                    shadowColor: COLORS.MAIN,
                    shadowOffset: {
                      width: 2,
                      height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 10,
                  }}
                  color="white"
                  title="CALL NOW"
                  size={18}
                  align="center"
                  font={styleState.headKh}
                  onPress={callWithLinking}
                />
              ) : (
                <GoButton
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    width: "90%",
                    borderRadius: 7,
                    shadowColor: COLORS.MAIN,
                    shadowOffset: {
                      width: 2,
                      height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 10,
                  }}
                  color="white"
                  title="ទាក់ទងមកឥឡូវនេះ"
                  size={18}
                  align="center"
                  font={styleState.bodyKh}
                  onPress={callWithLinking}
                />
              )}
              {language?.english ? (
                <GoButton
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    width: "90%",
                    borderRadius: 7,
                    marginTop: 15,
                    shadowColor: COLORS.MAIN,
                    shadowOffset: {
                      width: 2,
                      height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 10,
                  }}
                  color="white"
                  title="FACEBOOK MESSENGER"
                  size={18}
                  align="center"
                  font={styleState.headKh}
                  // onPress={() => navigation.navigate("InputAccount")}
                  onPress={handleOpenWithLinking}
                />
              ) : (
                <GoButton
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    width: "90%",
                    borderRadius: 7,
                    marginTop: 15,
                    shadowColor: COLORS.MAIN,
                    shadowOffset: {
                      width: 2,
                      height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 10,
                  }}
                  color="white"
                  title="ផ្ញើរសារហ្វេសប៊ុក"
                  size={18}
                  align="center"
                  font={styleState.bodyKh}
                  // onPress={() => navigation.navigate("InputAccount")}
                  onPress={handleOpenWithLinking}
                />
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>

      <TouchableOpacity onPress={() => openModalExchange(true)}>
        <View style={styles.listDown}>
          <Feather
            name="phone-call"
            size={22}
            color="#A3A6A9"
            style={{ margin: 9, top: 3 }}
          />
          {language?.english ? (
            <Text style={styles.text}>Contact Us</Text>
          ) : (
            <Text style={styles.text}>ទាក់ទងមកយើង</Text>
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
  btn: {
    alignItems: "center",
  },
});
