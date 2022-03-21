import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Root from "../../../page/root";
import Header5 from "../../../routes/header/header5";
import { LinearGradient } from "expo-linear-gradient";
import { StyleController } from "../../../context/provider/styleProvider";
import { FontAwesome } from "@expo/vector-icons";
import Contact from "./contact";
import EditProfile from "./modal/editProfile";
import { DataController } from "../../../context/provider";

export default function MyProfile({ navigation }) {
  const { accountDBCtx, language } = useContext(DataController);
  const { styleState, height, width } = useContext(StyleController);
  const [openEditProfile, setOpenEditProfile] = useState(false);

  return (
    <Root
      Header={
        language?.english ? (
          <Header5
            navigation={navigation}
            title={"My Profile"}
            setOpen={setOpenEditProfile}
          />
        ) : (
          <Header5
            navigation={navigation}
            title={"ប្រូហ្វាលរបស់ខ្ញុំ"}
            setOpen={setOpenEditProfile}
          />
        )
      }
    >
      <EditProfile
        open={openEditProfile}
        setOpen={setOpenEditProfile}
        // data={AccDB}
      />

      <LinearGradient
        colors={["#baf8c6", "rgba(54,179,77,1) 100%"]}
        locations={[0.01, 0.9]}
        style={{
          height: Platform.OS === "ios" ? height * 0.3 : height * 0.29,
        }}
      >
        <View style={styles.container}>
          <View style={styles.profile}>
            <FontAwesome
              name="user-circle"
              size={100}
              // color="#D0D0D0"
              color="#ffffff"
              style={{ textAlign: "center" }}
            />

            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#ffffff",
                top: 10,
                fontWeight: "bold",
              }}
            >
              {accountDBCtx?.lastName?.toUpperCase() +
                "  " +
                accountDBCtx?.firstName?.toUpperCase()}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#ffffff",
                top: 10,
              }}
            >
              Account Number:{accountDBCtx?.accountNumber}
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View>
        <View style={styles.head}>
          {language?.english ? (
            <Text
              style={{
                fontSize: 16,
                padding: Platform.OS === "ios" ? 3 : 2,
                left: 20,
              }}
            >
              Address
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                padding: Platform.OS === "ios" ? 3 : 2,
                left: 20,
              }}
            >
              អាសយដ្ឋាន
            </Text>
          )}
        </View>
        <Contact />
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
  content: {
    top: Platform.OS === "ios" ? 10 : 10,
  },
  head: {
    width: "100%",
    height: Platform.OS === "ios" ? 30 : 28,
    backgroundColor: "#DEDEDE",
  },
});
