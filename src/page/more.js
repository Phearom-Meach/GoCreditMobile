import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Root from "./root";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ContactUs from "../components/More/modalContact/contactUs";
import { DataController } from "../context/provider";
import { Entypo } from "@expo/vector-icons";
import SignOut from "../components/More/modalSignOut/signOut";
import TermNConditions from "../components/More/modalTerm/Term&Conditions";
import Header1 from "../routes/header/header1";

export default function More({ navigation }) {
  const {language ,user,accountDBCtx} = useContext(DataController);

  return (
    <Root Header={<Header1 title={"GO CREDIT"} navigation={navigation} />}>
      <View style={styles.container}>
        <View style={styles.profile}>
       
            <FontAwesome
              name="user-circle"
              size={100}
              color="#D0D0D0"
              style={{ textAlign: "center" }}
            />

          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color:"#333333",
              top: 10,
              fontWeight: "bold",
            }}
          >
            {accountDBCtx?.firstName?.toUpperCase() + "  "+ accountDBCtx?.lastName?.toUpperCase()}
            
          </Text>
        </View>
        <View style={{ top: 30 }}>

          <TouchableOpacity onPress={() => navigation.navigate("PayPlace")}>
            <View style={styles.listDown}>
              <Entypo
                name="location"
                size={22}
                color="#A3A6A9"
                style={{ margin: 9, top: 3 }}
              />
              {language?.english?
              <Text style={styles.text}>Go Credit Pay Place</Text>
              :
              <Text style={styles.text}>កន្លែងទូទាត់ Go Credit</Text>

            }
            </View>
          </TouchableOpacity>
          <ContactUs />
          <TermNConditions />

          <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
            <View style={styles.listDown}>
              <Ionicons
                name="settings-sharp"
                size={22}
                color="#A3A6A9"
                style={{ margin: 9, top: 3 }}
              />
              {language?.english?
              <Text style={styles.text}>Settings</Text>
              :
              <Text style={styles.text}>ការកំណត់ផ្សេងៗ</Text>
            }
            </View>
          </TouchableOpacity>
          <SignOut/>        
        </View>
      </View>
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    top: 10,
  },
  profile: {
    alignSelf: "center",
  },
  listDown: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    height: 50,
    flexDirection: "row",
    // backgroundColor: 'pink'
  },
  text: {
    fontSize: 16,
    margin: 8,
    top: 5,
  },
});
