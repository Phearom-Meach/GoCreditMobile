import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function EditContact({ address, setAddress }) {
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
        <TextInput
          style={styles.text}
          value={address?.city}
          onChangeText={(e) =>
            setAddress((ele) => ({
              ...ele,
              city: e,
            }))
          }
        />
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
        <TextInput
          style={styles.text}
          value={address?.district}
          onChangeText={(e) =>
            setAddress((ele) => ({
              ...ele,
              district: e,
            }))
          }
        />
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
        <TextInput
          style={styles.text}
          value={address?.commune}
          onChangeText={(e) =>
            setAddress((ele) => ({
              ...ele,
              commune: e,
            }))
          }
        />
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
        <TextInput
          style={styles.text}
          value={address?.village}
          onChangeText={(e) =>
            setAddress((ele) => ({
              ...ele,
              village: e,
            }))
          }
        />
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
        <TextInput
          style={styles.text}
          value={address?.houseNo}
          onChangeText={(e) =>
            setAddress((ele) => ({
              ...ele,
              houseNo: e,
            }))
          }
        />
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
        <TextInput
          style={styles.text}
          value={address?.streetNo}
          onChangeText={(e) =>
            setAddress((ele) => ({
              ...ele,
              streetNo: e,
            }))
          }
        />
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
