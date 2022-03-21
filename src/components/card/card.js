import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { StyleController } from "../../context/provider/styleProvider";
import { COLORS } from "../../../color";
import { DataController } from "../../context/provider";
import QRCode from "react-native-qrcode-svg";

export default function Card(props) {
  const { styleState, height, width } = useContext(StyleController);
  const { cardDBCtxDispatch, accountDBCtx, cardDBCtx, language } =
    useContext(DataController);

  return (
    <View
      style={{
        height: Platform.OS === "ios" ? 230 : 215,
        width: Platform.OS === "ios" ? width * 0.9 : width * 0.9,
        backgroundColor: COLORS.PRIMARY,
        left: 20,
        top: 10,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          left: 20,
          // position: "absolute",
          top: Platform.OS === "ios" ? 15 : 15,
        }}
      >
        <Image
          source={require("../../assets/LogoWhite.png")}
          style={styles.logo}
        />

        <Text
          style={{
            fontSize: Platform.OS === "ios" ? 16 : 16,
            color: "white",
            fontWeight: "bold",
            top: Platform.OS === "ios" ? 10 : 5,
          }}
        >
          GO CREDIT CARD
        </Text>
        <View style={{ width: width * 0.6 }}>
          <Text
            style={{
              color: "white",
              top: Platform.OS === "ios" ? 35 : 25,
              fontSize: 20,
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            {props?.englishName?.toUpperCase()}
          </Text>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: Platform.OS === "ios" ? 15 : 15,
          right: 20,
        }}
      >
        <QRCode value={props?.id} size={70} />
      </View>

      <Image
        source={require("../../assets/onlyLeaf.png")}
        style={styles.imageBg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageBg: {
    width: Platform.OS === "ios" ? 235 : 220,
    height: Platform.OS === "ios" ? 235 : 220,
    position: "absolute",
    opacity: 0.1,
    alignSelf: "center",
  },
  imageQR: {
    width: Platform.OS === "ios" ? 75 : 65,
    height: Platform.OS === "ios" ? 75 : 65,
    alignSelf: "flex-end",
  },
  logo: {
    width: Platform.OS === "ios" ? 60 : 60,
    height: Platform.OS === "ios" ? 60 : 60,
  },
});
