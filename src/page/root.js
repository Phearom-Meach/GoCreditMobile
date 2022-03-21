import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { COLORS } from "../../color";
import { StyleController } from "../context/provider/styleProvider";

export default function Root({ children, Header, Arrow }) {
  const { styleState } = useContext(StyleController);

  return (
    <View
      style={{
        // backgroundColor: COLORS.PRIMARY,
        minHeight: styleState.fullScreen,
      }}
    >
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <SafeAreaView>
        {Header}
        {Arrow}

        <ScrollView>
          <View
            style={{
              paddingRight: styleState.rootPad,
              marginBottom: Platform.OS === "ios" ? 250 : 250,
            }}
          >
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
