import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import RenameModal from "./modal/rename";

export default function DropDown({ data }) {
  return (
    <View style={styles.container}>
      <RenameModal data={data} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
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
});
