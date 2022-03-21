import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Button,
} from "react-native";
import { StyleController } from "../../context/provider/styleProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DataController } from "../../context/provider";

export default function AccountSummary({ navigation }) {
  const { height, width } = useContext(StyleController);
  const { accountDBCtx, language } = useContext(DataController);

  return (
    <View>
      <ScrollView
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            width: Platform.OS === "ios" ? width * 0.53 : width * 0.52,
            height: Platform.OS === "ios" ? height * 0.17 : height * 0.155,
            backgroundColor: "#E4E4E3",
            borderRadius: 10,
            margin: 20,

            // shadowColor: "rgba(0,0,0,0.20)",
            // shadowOpacity: 0.3,
          }}
        >
          <View style={styles.iconAccount}>
            <MaterialCommunityIcons
              name="wallet"
              size={24}
              color="black"
              style={{ textAlign: "center", top: 8 }}
            />
          </View>
          {language?.english ? (
            <Text style={styles.subText}>Total in USD</Text>
          ) : (
            <Text style={styles.subText}>សរុបជា USD</Text>
          )}

          <Text style={styles.money}>
            $ {Number.parseFloat(accountDBCtx?.totalAmount).toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            width: Platform.OS === "ios" ? width * 0.52 : width * 0.5,
            height: Platform.OS === "ios" ? height * 0.17 : height * 0.155,
            backgroundColor: "#E4E4E3",
            borderRadius: 10,
            margin: 20,
            left: -10,
            // shadowColor: "rgba(0,0,0,0.20)",
            // shadowOpacity: 0.3,
          }}
        >
          <View style={styles.iconAccount}>
            <MaterialCommunityIcons
              name="wallet"
              size={24}
              color="black"
              style={{ textAlign: "center", top: 8 }}
            />
          </View>
          {language?.english ? (
            <Text style={styles.subText}>Total in KHR</Text>
          ) : (
            <Text style={styles.subText}>សរុបជា KHR</Text>
          )}
          <Text style={styles.money}>
            ៛ {Number.parseFloat(accountDBCtx?.totalAmount * 4000).toFixed(2)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    // height: Dimensions.get("screen").height,
  },
  iconAccount: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    margin: 10,
    left: 10,
    borderRadius: 20,
    shadowColor: "rgba(0,0,0,0.20)",
    shadowOpacity: 0.2,
  },
  subText: {
    left: 20,
    top: 5,
    opacity: 0.5,
  },
  money: {
    left: 20,
    top: 10,
    fontSize: 22,
    fontWeight: "bold",
    opacity: 0.7,
  },
  title: {
    left: 10,
    padding: 10,
    fontSize: 16,
  },
});
