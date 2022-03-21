import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { StyleController } from "../../context/provider/styleProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../../color";
import { Feather } from "@expo/vector-icons";
import moment from "moment";

export default function NotificationBell(load) {
  const { styleState, height, width } = useContext(StyleController);

  return (
    <View
      style={{
        width: Platform.OS === "ios" ? width * 0.95 : width * 0.95,
        height: Platform.OS === "ios" ? height * 0.12 : height * 0.1,
        // height: "auto",
        backgroundColor: COLORS.MAIN,
        borderRadius: 5,
        shadowOpacity: 0.9,
        shadowColor: "#e4e4e4",
        shadowOffset: { width: 0.1, height: 5 },
      }}
    >
      <View style={styles.boderRound}>
        {load.paymentTitle === "Expend transaction" ? (
          <View style={styles.roundIcon}>
            <MaterialCommunityIcons
              name="arrow-top-right"
              size={32}
              color="#EFB419"
              style={{ left: 18, top: 12 }}
            />
            <FontAwesome
              name="circle-thin"
              size={45}
              color="#EFB419"
              style={{ position: "absolute", padding: 5, left: 10 }}
            />
          </View>
        ) : (
          <View style={styles.roundIcon}>
            <MaterialCommunityIcons
              name="arrow-bottom-left"
              size={32}
              color="#36B34D"
              style={{ left: 18, top: 12 }}
            />
            <FontAwesome
              name="circle-thin"
              size={45}
              color="#36B34D"
              style={{ position: "absolute", padding: 5, left: 10 }}
            />
          </View>
        )}
        <View style={{ width: "80%", top: 10, alignSelf: "center" }}>
          <Text style={{ fontSize: 16 }}>{load.paymentTitle}</Text>
          <Text style={{ fontSize: 11, top: 2 }}>
            {moment(load.dateTime).format("DD/MMM/YYYY HH:mm:ss")}
          </Text>
        </View>
      </View>
      <View style={{ width: "90%", position: "absolute", bottom: 8, left: 18 }}>
        <Text style={{ fontSize: 13 }}>
          {Number.parseFloat(load.grandTotal).toFixed(2)} USD{" "}
          {load.paymentTitle === "Expend transaction"
            ? "Expend to account"
            : "Deposit from"}{" "}
          {load.transactionTo}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  boderRound: {
    flexDirection: "row",
  },
  roundIcon: {
    width: "18%",
  },
});
