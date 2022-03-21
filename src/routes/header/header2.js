import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform, Image,TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { COLORS } from "../../../color";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleController } from "../../context/provider/styleProvider";
import { DataController } from "../../context/provider";
import { Badge } from "react-native-paper";
import { ACTION } from "../../context/reducer";

export default function Header2({ navigation, title }) {
  const { styleState, height, width } = useContext(StyleController);
  const { user, language, notiNumDBCtx, notiNumDispatch } =
    useContext(DataController);

  const clearBadge = () => {
    notiNumDispatch({
      type: ACTION.NOTINUM,
      payload: [],
    });
  };

  return (
    // <TouchableOpacity>
    <View style={styles.header}>
      <View style={styles.insideBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              width: width * 0.5,
              flexDirection: "row",
              alignItems: "center",
              height: 55,
              // padding: 15,
              // backgroundColor:"yellow",
            }}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color="white"
              style={{ width: 30, left: 20, alignItems: "center" }}
            />

            {language?.english ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  alignItems: "center",
                  left: 10,
                }}
              >
                {title}
              </Text>
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  alignItems: "center",
                  left: 10,
                }}
              >
                {title}
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <View
          style={{
            width: width * 0.5,
            height: 55,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            right: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              clearBadge(), navigation.navigate("Notification");
            }}
            style={{
              padding: 8,
              left: 5,
              position: "relative",
            }}
          >
            <Ionicons
              name="notifications"
              size={24}
              color="white"
              activeOpacity={0.7}
              style={{ top: 1 }}
            />
            {notiNumDBCtx.length === 0 ? null : (
              <Badge
                size={18}
                style={{ position: "absolute", top: 2, right: 3 }}
              >
                {notiNumDBCtx.length}
              </Badge>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
            <Avatar
              size={60}
              icon={{ name: "user-circle", type: "font-awesome" }}
              activeOpacity={0.7}
              // style={{padding: 10,}}
            />

          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 55,
    backgroundColor: COLORS.PRIMARY,
  },
  insideBar: {
    flexDirection: "row",
    // // padding: 10,
    // alignItems: "center",
    // backgroundColor:'blue'
  },
});
