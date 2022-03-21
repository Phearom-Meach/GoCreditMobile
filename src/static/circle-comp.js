import React from "react";
import { View, Dimensions, Platform } from "react-native";
import { COLORS } from "../../color";

export const CircleCover = (props) => {
  return (
    <View style={{height: Dimensions.get("screen").height,}}>
      <View
        style={{
        alignSelf: 'center',
        }}
      >
        <View
          style={{
            width:Platform.OS === 'ios'? 130:120,
            height:Platform.OS === 'ios'? 130:120,
            backgroundColor: "white",
            borderRadius: 80,
            borderWidth: 1,
            borderColor: COLORS.YELLOW,
            alignSelf: 'center',
          }}
        >
          <View
            style={{
              width:Platform.OS === 'ios'? 100:90,
              height:Platform.OS === 'ios'? 100:90,
              backgroundColor: "white",
              borderRadius: 80,
              borderWidth: 2,
              borderColor: COLORS.YELLOW,
              alignSelf: "center",
              top: 14,

            }}
          >
            <View
              style={{
                width: Platform.OS === 'ios'? 70:60,
                height:Platform.OS ==='ios'? 70:60,
                backgroundColor: "#DCEDDF",
                borderRadius: 80,
                alignSelf: "center",
                top: 13,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <View
                style={{
                 alignSelf: 'center',
                 top:Platform.OS ===  'ios'? 14:10,
                 
                }}
              >
                {props?.icon}
              </View>
            </View>
          </View>
        </View>
      </View>
      </View>
  );
};
