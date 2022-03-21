import React, { useState, useContext } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { StyleController } from "../../../context/provider/styleProvider";
import Header3 from "../../../routes/header/header3";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../../color";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Root from "../../../page/root";
import Header2 from "../../../routes/header/header2";
import { DataController } from "../../../context/provider";

export default function PayPlace({ navigation }) {
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
    <Root
      Header={
        language?.english ? (
          <Header2 navigation={navigation} title={"Go Credit Pay Place"} />
        ) : (
          <Header2 navigation={navigation} title={"កន្លែងទូទាត់ Go Credit"} />
        )
      }
    >
      <View>
        <View
          style={{
            height: height * 1,
            // height: Dimensions.get("screen").height,
            width: width * 1,
            backgroundColor: COLORS.MAIN,
          }}
        >
          <Image
            source={require("../../../assets/image_web_40.png")}
            style={{
              width: width * 1,
              height: height * 0.35,
            }}
          />
          <View style={styles.info}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../../assets/profile_restuarants.png")}
                style={styles.profile}
              />
              <View style={{ padding: 10 }}>
                {language?.english ? (
                  <Text style={{ fontSize: 18 }}>CAFETERIAL</Text>
                ) : (
                  <Text style={{ fontSize: 18 }}>អាហារដ្ឋាន</Text>
                )}
                {language?.english ? (
                  <Text style={{ fontSize: 12, marginVertical: 5 }}>
                    Food & Berverage
                  </Text>
                ) : (
                  <Text style={{ fontSize: 12 }}>អាហារ និង ភេសជ្ជៈ</Text>
                )}
              </View>
            </View>
            <View style={{ top: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <Feather
                  name="phone-call"
                  size={22}
                  color="#A3A6A9"
                  style={{ margin: 9, top: 3 }}
                />
                <View>
                  {language?.english ? (
                    <Text style={styles.text}>Contact:</Text>
                  ) : (
                    <Text style={styles.text}>ទំនាក់ទំនង:</Text>
                  )}
                  <Text style={{ padding: 8, fontSize: 16 }}>
                    063 50 66 999
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", padding: 2 }}>
                <Entypo
                  name="location"
                  size={22}
                  color="#A3A6A9"
                  style={{ margin: 9, top: 3 }}
                />
                <View>
                  {language?.english ? (
                    <Text style={styles.text}>Where to Pay:</Text>
                  ) : (
                    <Text style={styles.text}>កន្លែងចំណាយ:</Text>
                  )}
                  {language?.english ? (
                    <Text style={{ padding: 8, fontSize: 16 }}>
                      #167 E0 Thmey Village, Svay Dangkum Siem Reap
                    </Text>
                  ) : (
                    <Text style={{ padding: 8, fontSize: 16 }}>
                      #167 E0 ភូមិថ្មី, សង្កាត់ស្វាយដង្គុំ, ខេត្តសៀមរាប
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Root>
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
