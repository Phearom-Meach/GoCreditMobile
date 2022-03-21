import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import Root from "../../page/root";
import Header2 from "../../routes/header/header2";
import { LinearGradient } from "expo-linear-gradient";
import { StyleController } from "../../context/provider/styleProvider";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../color";
import { CircleCover } from "../../static/circle-comp";
import { DataController } from "../../context/provider";
import { GoButton } from "../../static/own-comp";
import { UPDATE_USER } from "../../gql/userInfo";
import { useMutation } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";

export default function ChangePin({ navigation }) {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx, language } = useContext(DataController);
  const [openEye1, setOpenEye1] = useState(true);
  const [openEye2, setOpenEye2] = useState(true);

  const [updatePin, setUpdatePin] = useState();
  const [rePin, setRePin] = useState();

  const [updateMobileUser, { loading }] = useMutation(UPDATE_USER, {
    onError: (e) => {
      console.log(e.message);
    },
    // onCompleted : ({updateMobileUser}) => {
    //   console.log(updateMobileUser)
    // }
  });
  const reSave = async () => {
    try {
      if (updatePin?.pin !== "" || rePin?.pin !== "") {
        if (
          updatePin?.pin.trim() !== undefined ||
          rePin?.pin.trim() !== undefined
        ) {
          if (updatePin?.pin.toString() === rePin?.pin.toString()) {
            await updateMobileUser({
              variables: {
                input: {
                  _id: accountDBCtx?._id,
                  pin: rePin.pin,
                },
              },
              update(_, result) {
                navigation.navigate("Success");
              },
            });

            // navigation.navigate("Success", { successful: "Setting" });
          } else {
            language?.english
              ? Alert.alert("Not match PIN", "Please input PIN again")
              : Alert.alert(
                  "លេខសម្ងាត់មិនដូចគ្នា",
                  "សូមបញ្ចូលលេខសម្ងាត់ម្ដងទៀត"
                );
          }
        } else {
          language?.english
            ? Alert.alert("Empty PIN", "Please input the PIN")
            : Alert.alert("លេខសម្ងាត់ទទេ", "សូមបញ្ចូលលេខសម្ងាត់");
        }
      }
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <Root
      Header={
        language?.english ? (
          <Header2 navigation={navigation} title={"Change PIN"} />
        ) : (
          <Header2 navigation={navigation} title={"ផ្លាស់ប្ដូរ PIN"} />
        )
      }
    >
      <LinearGradient
        colors={["#baf8c6", "rgba(54,179,77,1) 100%"]}
        locations={[0, 0.9]}
        style={{
          height: Platform.OS === "ios" ? height * 0.3 : height * 0.29,
        }}
      >
        <View
          style={{
            height: Platform.OS === "ios" ? "35%" : "34%",
            top: Platform.OS === "ios" ? 20 : 25,
            // backgroundColor: "pink",
          }}
        >
          <CircleCover
            icon={<Feather name="key" size={45} color="#2C2C2C" />}
          />
        </View>
        <View style={styles.title}>
          {language?.english ? (
            <Text style={styles.subTitle}>Change PIN</Text>
          ) : (
            <Text style={styles.subTitleKh}>ផ្លាស់ប្ដូរ PIN</Text>
          )}
          {language?.english ? (
            <Text style={styles.TextTitles}>
              Set your new PIN so you can login and access Go Credit
            </Text>
          ) : (
            <Text style={styles.TextTitlesKh}>
              កំណត់ PIN ថ្មីរបស់អ្នក ដូចច្នេះអ្នកអាចដំណើរការកម្មវិធី Go Credit
            </Text>
          )}

          {/* <Text style={styles.TextTitles}>
            you can login and access Go Credit
          </Text> */}
        </View>
      </LinearGradient>
      <View style={styles.body}>
        <View>
          {language?.english ? (
            <Text style={{ fontSize: 12, color: "#0B0C0C" }}>
              New 4-digit PIN
            </Text>
          ) : (
            <Text style={{ fontSize: 12, color: "#0B0C0C" }}>
              បង្កើតលេខសម្ងាត់ ៤ ខ្ទង់
            </Text>
          )}

          <View style={styles.conInput}>
            <TextInput
              secureTextEntry={openEye1}
              autoFocus
              style={styles.input}
              keyboardType="numeric"
              placeholder="* * * *"
              maxLength={4}
              value={updatePin?.pin}
              onChangeText={(e) =>
                setUpdatePin((ele) => ({
                  ...ele,
                  pin: e,
                }))
              }
            />
            <View style={{ width: 30, height: 30, alignItems: "center" }}>
              {openEye1 ? (
                <Feather
                  name="eye-off"
                  size={20}
                  color="black"
                  onPress={() => setOpenEye1(!openEye1)}
                />
              ) : (
                <AntDesign
                  name="eye"
                  size={24}
                  color="black"
                  onPress={() => setOpenEye1(!openEye1)}
                />
              )}
            </View>
          </View>
        </View>

        <View style={{ top: 15 }}>
          {language?.english ? (
            <Text style={{ fontSize: 12, color: "#0B0C0C" }}>
              Re-enter 4-digit PIN
            </Text>
          ) : (
            <Text style={{ fontSize: 12, color: "#0B0C0C" }}>
              សូមបញ្ចូលលេខសម្ងាត់ ៤ ខ្ទង់ម្ដងទៀត
            </Text>
          )}

          <View style={styles.conInput}>
            <TextInput
              secureTextEntry={openEye2}
              style={styles.input}
              placeholder="* * * *"
              keyboardType="numeric"
              maxLength={4}
              value={rePin?.pin}
              onChangeText={(e) =>
                setRePin((ele) => ({
                  ...ele,
                  pin: e,
                }))
              }
            />
            <View style={{ width: 30, height: 30, alignItems: "center" }}>
              {openEye2 ? (
                <Feather
                  name="eye-off"
                  size={20}
                  color="black"
                  onPress={() => setOpenEye2(!openEye2)}
                />
              ) : (
                <AntDesign
                  name="eye"
                  size={24}
                  color="black"
                  onPress={() => setOpenEye2(!openEye2)}
                />
              )}
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          top: Platform.OS === "ios" ? 50 : 40,
        }}
      >
        {language?.english ? (
          <GoButton
            style={{
              backgroundColor: COLORS.PRIMARY,
              width: "90%",
              borderRadius: 7,
            }}
            color="white"
            title="UPDATE"
            size={18}
            align="center"
            font={styleState.SegoeUI}
            fontWeight="bold"
            onPress={() => reSave()}
          />
        ) : (
          <GoButton
            style={{
              backgroundColor: COLORS.PRIMARY,
              width: "90%",
              borderRadius: 7,
            }}
            color="white"
            title="បន្ទាប់"
            size={18}
            align="center"
            font={styleState.SegoeUI}
            fontWeight="bold"
            onPress={() => reSave()}
          />
        )}
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    top: Platform.OS === "ios" ? 20 : 20,
  },
  title: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: Platform.OS === "ios" ? 10 : 10,
  },
  subTitle: {
    fontSize: 20,
    bottom: 10,
    color: "white",
  },
  subTitleKh: {
    fontSize: 20,
    top: 2,
    color: "white",
  },
  TextTitles: {
    fontSize: 14,
    color: "white",
  },
  TextTitlesKh: {
    fontSize: 14,
    color: "white",
    top: 5,
  },

  text: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    bottom: Platform.OS === "ios" ? 0 : 4,
    alignItems: "center",
  },
  conInput: {
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#0B0C0C",
    marginVertical: 3,
  },
  input: {
    width: "92%",
  },
  body: {
    top: 15,
    width: "90%",
    alignSelf: "center",
  },
});
