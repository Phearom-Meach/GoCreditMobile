import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { COLORS } from "../../../color";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleController } from "../../context/provider/styleProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { DataController } from "../../context/provider";

export default function Header5({ navigation, title, setOpen }) {
  const { styleState, height, width } = useContext(StyleController);
  const { language } = useContext(DataController);

  return (
    <View style={styles.header}>
      <View style={styles.insideBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              width: width * 0.5,
              flexDirection: "row",
              // alignItems: "flex-start",
              // left: 20,

              height: 100,
              padding: 15,
              // alignItems: 'center',
            }}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="#ffff" />
            {language?.english ? (
              <Text style={{ color: "#ffff", fontSize: 16, top: 1 }}>{title}</Text>
            ) : (
              <Text style={{ color: "#ffff", fontSize: 16, alignItems: 'center'}}>{title}</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
        >
          <View
            style={{
              width: width * 0.5,
              flexDirection: "row",
              height: 100,
            }}
          >
            <View
              style={{ top: 1, position: "absolute", padding: 15, right: 15 }}
            >
              <FontAwesome5
                name="edit"
                size={22}
                color="#ffff"
                activeOpacity={0.7}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  insideBar: {
    flexDirection: "row",
    // padding: 10,
    // alignItems: "center",
    // width: "100%",
  },
  header: {
    width: "100%",
    height: 55,
    backgroundColor: COLORS.PRIMARY,
  },
});
