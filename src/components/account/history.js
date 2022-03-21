import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";
import { StyleController } from "../../context/provider/styleProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { QUERY_INVOICE_BY_SUB_USER } from "../../gql/userInfo";
import { useQuery } from "@apollo/client";
import { ACTION } from "../../context/reducer";
import { DataController } from "../../context/provider";
import moment from "moment";

export default function History(props) {
  const { styleState, height, width } = useContext(StyleController);
  const { cardDBCtxDispatch, cardDBCtx } = useContext(DataController);

  return (
    <View>
      <View style={styles.history}>
        <View style={styles.date}>
          <Text style={{ left: 20, fontSize: 12, opacity: 0.4, padding: 3 }}>
            {moment(props?.transactionDate).format("DD/MMM/YYYY HH:mm:ss")}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: Dimensions.get("screen").width,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            width: width * 0.5,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "100%",
              height: 55,
              backgroundColor: "white",
            }}
          >
            <MaterialCommunityIcons
              name="arrow-top-right"
              size={28}
              color="#EFB419"
              style={{ left: 23, top: 15 }}
            />
            <FontAwesome
              name="circle-thin"
              size={40}
              color="#EFB419"
              style={{ position: "absolute", padding: 5, left: 15, top: 3 }}
            />
          </View>
          <Text
            style={{
              position: "absolute",
              left: 70,
              fontSize: 16,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Invoice
          </Text>
        </View>
        <View
          style={{
            width: width * 0.5,
            height: 55,
            alignItems: "flex-end",
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              padding: 20,
              fontSize: 14,
              fontWeight: "bold",
              right: 10,
              textAlign: "center",
            }}
          >
            {Number.parseFloat(props?.grandTotal).toFixed(2) + " $"}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  history: {
    width: Dimensions.get("screen").width,
  },
  date: {
    width: "100%",
    height: 22,
  },
});
