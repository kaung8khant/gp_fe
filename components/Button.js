import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

const Button = ({ onPress, title, styles, disabled, type = "" }) => {
  if (disabled) {
    return (
      <View style={{ padding: 10 }}>
        <View style={{ ...styles, ...customStyles.disable }}>
          <CustomText style={customStyles.disabledText}>{title}</CustomText>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={onPress}
          style={
            type === "inverted"
              ? { ...styles, ...customStyles.inverted }
              : { ...styles, ...customStyles.button }
          }
        >
          <CustomText
            style={
              type === "inverted"
                ? customStyles.invertedText
                : customStyles.text
            }
          >
            {title}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }
};

const customStyles = StyleSheet.create({
  button: {
    backgroundColor: "#2FB53D",
    padding: 10,
    textAlign: "center",
    borderRadius: 40,
  },
  disable: {
    backgroundColor: "#E0DEDE",
    padding: 10,
    textAlign: "center",
    borderRadius: 40,
  },
  disabledText: {
    //  fontFamily: "PyidaungsuBold",
    fontSize: 16,
    textAlign: "center",
    color: "#828282",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  inverted: {
    backgroundColor: "#E7F5E7",
    padding: 10,
    textAlign: "center",
    borderRadius: 40,
  },
  invertedText: {
    fontSize: 16,
    textAlign: "center",
    color: "#2FB53D",
  },
});
export default Button;
