import * as React from "react";
import { StyleSheet, Text } from "react-native";
//import { useFonts, Roboto } from "@expo-google-fonts/inter";

export default function TextWrap(props) {
  // let [fontsLoaded] = useFonts({
  //   Roboto,
  // });

  return <Text>{props.children}</Text>;
}
// const styles = StyleSheet.create({
//   textStyle: {
//     fontFamily: Roboto,
//   },
// });
