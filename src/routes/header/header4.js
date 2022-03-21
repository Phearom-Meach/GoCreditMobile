import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity
} from "react-native";

import { COLORS } from "../../../color";
import { StyleController } from "../../context/provider/styleProvider";
import { DataController } from "../../context/provider";


export default function Header4(props) {
  const { styleState, height, width } = useContext(StyleController);
  const {language} = useContext(DataController);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.insideBar}>
          <View
            style={{
              width: width * 0.5,
              flexDirection: "row",
              alignItems: "flex-start",
              left: 10,
            }}
          >
            {language?.english?
            <TouchableOpacity  onPress={props?.onPress}>
            <Text
            style={{
              padding: 15,
              color: "white",
              fontSize: 16,
              // ...props.style,
            }}
           
          >
            Cancel
          </Text>
          </TouchableOpacity>
          :
          <TouchableOpacity  onPress={props?.onPress}>
          <Text
              style={{
                padding: 15,
                color: "white",
                fontSize: 16,
                // ...props.style,
              }}
             
            >
              ចាកចេញ
            </Text>
            </TouchableOpacity>
          }
            
          </View>
        </View>
      </View>
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    top: Platform.OS === "ios" ? 20 : 0,
    marginBottom: Platform.OS === "ios" ? 20 : 0,
  },
  header: {
    width: "100%",
    height: 55,
    backgroundColor: COLORS.PRIMARY,
  },
  insideBar: {
    flexDirection: "row",
    // padding: 10,
    alignItems: "center",
  },
});
