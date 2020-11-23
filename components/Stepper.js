import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ThemeProvider,
} from "react-native";

const deviceWidth = Dimensions.get("window").width;

const Stepper = ({ active, style }) => {
  return (
    <View
      style={{
        ...style,

        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: deviceWidth / 3 - 25,
          backgroundColor: active > 0 ? "#2FB53D" : "#E7F5E7",
          height: 2,
        }}
      ></View>
      <View
        style={{
          width: deviceWidth / 3 - 25,
          backgroundColor: active > 1 ? "#2FB53D" : "#E7F5E7",
          height: 2,
        }}
      ></View>
      <View
        style={{
          width: deviceWidth / 3 - 25,
          backgroundColor: active > 2 ? "#2FB53D" : "#E7F5E7",
          height: 2,
        }}
      ></View>
    </View>
  );
};
export default Stepper;
