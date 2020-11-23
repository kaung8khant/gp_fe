import React, { useContext } from "react";
import { font_converter } from "../utils/string";
import { Text } from "react-native";
import FontContext from "../utils/context/FontContext";
import { setStatusBarStyle } from "expo-status-bar";

export default function CustomText({ style, children }) {
  const { zawgyi, setZawgyi } = useContext(FontContext);
  let font = zawgyi
    ? style.fontWeight && style.fontWeight === "bold"
      ? "ZawgyiBold"
      : "Zawgyi"
    : style.fontWeight && style.fontWeight === "bold"
    ? "PyidaungsuBold"
    : "Pyidaungsu";

  let styleList = style;
  if (styleList.fontWeight) {
    delete styleList.fontWeight;
  }
  if (styleList.fontFamily) {
    delete styleList.fontFamily;
  }
  return (
    <Text style={{ fontFamily: font, ...styleList }}>
      {font_converter(children ? children : "", zawgyi)}
    </Text>
  );
}
