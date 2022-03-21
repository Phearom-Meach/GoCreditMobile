import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { DataController } from "../../../context/provider";

export default function Contact({ navigation }) {
  const { accountDBCtx } = useContext(DataController);
  const [locationDB, setLocationDB] = useState({});
  useEffect(() => {
    setLocationDB(accountDBCtx?.location);
  }, [navigation, accountDBCtx]);

  // console.log(locationDB?.city)
  return (
    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
      <View style={styles.listDown}>
        <View style={{ flexDirection: "row" }}>
          <Feather
            name="flag"
            size={18}
            color="#A3A6A9"
            style={{ margin: 5, top: 3 }}
          />
          <Text style={styles.title}>City/Province</Text>
        </View>
        <Text style={styles.text}>{locationDB?.city}</Text>
      </View>
      <View style={styles.listDown}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="home-analytics"
            size={18}
            color="#A3A6A9"
            style={{ margin: 5, top: 3 }}
          />
          <Text style={styles.title}>District/Khan</Text>
        </View>
        <Text style={styles.text}>{locationDB?.district}</Text>
      </View>
      <View style={styles.listDown}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="home-city-outline"
            size={18}
            color="#A3A6A9"
            style={{ margin: 5, top: 3 }}
          />
          <Text style={styles.title}>Commune/Sangkat</Text>
        </View>
        <Text style={styles.text}>{locationDB?.commune}</Text>
      </View>
      <View style={styles.listDown}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="location-outline"
            size={18}
            color="#A3A6A9"
            style={{ margin: 5, top: 3 }}
          />
          <Text style={styles.title}>Village</Text>
        </View>
        <Text style={styles.text}>{locationDB?.village}</Text>
      </View>
      <View style={styles.listDown}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="home-outline"
            size={18}
            color="#A3A6A9"
            style={{ margin: 5, top: 3 }}
          />
          <Text style={styles.title}>House No.</Text>
        </View>
        <Text style={styles.text}>{locationDB?.houseNo}</Text>
      </View>
      <View style={styles.listDown}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="trail-sign-outline"
            size={18}
            color="#A3A6A9"
            style={{ margin: 5, top: 3 }}
          />
          <Text style={styles.title}>Street No.</Text>
        </View>
        <Text style={styles.text}>{locationDB?.streetNo}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  listDown: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    height: Platform.OS === "ios" ? 55 : 55,
  },
  title: {
    fontSize: 12,
    margin: 5,
    top: 5,
    color: "#A3A6A9",
  },
  text: {
    fontSize: 16,
    margin: Platform.OS === "ios" ? 3 : 0,
    left: Platform.OS === "ios" ? 32 : 35,
    color: "#000000",
  },
});
