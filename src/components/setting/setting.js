import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Switch,
} from "react-native";
import Root from "../../page/root";
import Header2 from "../../routes/header/header2";
import { StyleController } from "../../context/provider/styleProvider";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Language from "./modal/language";
import { DataController } from "../../context/provider";

export default function Setting({ navigation }) {
  const { styleState, height, width } = useContext(StyleController);
  const { user, accountDBCtx, language } = useContext(DataController);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <Root
      Header={
        language?.english ? (
          <Header2 navigation={navigation} title={"Setting"} />
        ) : (
          <Header2 navigation={navigation} title={"ការកំណត់"} />
        )
      }
    >
      <LinearGradient
        colors={["#baf8c6", "rgba(54,179,77,1) 100%"]}
        locations={[0.01, 0.9]}
      >
        <View
          style={{
            height: Platform.OS === "ios" ? height * 0.3 : height * 0.29,
          }}
        >
          <View style={styles.container}>
            <View style={styles.profile}>
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
                {accountDBCtx?.lastName?.toUpperCase() +
                  "  " +
                  accountDBCtx?.firstName?.toUpperCase()}

                {/* {user?.username.toUpperCase()} */}
              </Text>
              {language?.english ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    color: "#ffffff",
                    top: 10,
                  }}
                >
                  Account Number: {accountDBCtx?.accountNumber}
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    color: "#ffffff",
                    top: 10,
                  }}
                >
                  លេខគណនី: {accountDBCtx?.accountNumber}
                </Text>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("MyProfile")}>
          <View style={styles.listDown}>
            <FontAwesome
              name="user-circle"
              size={22}
              color="#A3A6A9"
              style={{ margin: 9, top: 3 }}
            />
            {language?.english ? (
              <Text style={styles.text}>My Profile</Text>
            ) : (
              <Text style={styles.text}>ប្រូហ្វាលរបស់ខ្ញុំ</Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.listDown}>
          <Language />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Verify", { data: "ChangePin" })}
        >
          <View style={styles.listDown}>
            <Feather
              name="key"
              size={22}
              color="#A3A6A9"
              style={{ margin: 9, top: 3 }}
            />
            {language?.english ? (
              <Text style={styles.text}>Change PIN</Text>
            ) : (
              <Text style={styles.text}>ផ្លាស់ប្ដូរលេខសម្ងាត់</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    top: Platform.OS === "ios" ? 25 : 35,
  },
  profile: {
    alignSelf: "center",
  },
  listDown: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    height: 50,
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    margin: 8,
    top: 5,
  },
  switch: {
    flex: 1,
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
});
