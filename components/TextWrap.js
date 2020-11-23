import React from "react";
import { Text, View } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

const TextWrap = (props) => {
  let [fontsLoaded] = useFonts({
    Pyidaungsu: "../assets/fonts/Pyidaungsu-Regular.ttf",
    PyidaungsuBold: "../assets/fonts/Pyidaungsu-Bold.ttf",
  });
  if (!fontsLoaded) {
    console.log("here");
    return <Text style={props.style}>{props.children}</Text>;
  } else {
    console.log("here2");
    return (
      <Text style={{ fontFamily: "Pyidaungsu", ...props.style }}>
        {props.children}
      </Text>
    );
  }
};
export default TextWrap;
