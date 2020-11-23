import React, { useContext } from "react";
import { font_converter } from "../utils/string";
import { Text } from "react-native";
import FontContext from "../utils/context/FontContext";
import { setStatusBarStyle } from "expo-status-bar";

export default function CustomText({ style = {}, children }) {
  const { zawgyi, setZawgyi } = useContext(FontContext);
  let font = zawgyi
    ? style.fontWeight && style.fontWeight === "bold"
      ? null
      : null
    : style.fontWeight && style.fontWeight === "bold"
    ? "PyidaungsuBold"
    : "Pyidaungsu";

  let styleList = style;
  if (!zawgyi && styleList.fontWeight) {
    delete styleList.fontWeight;
  }
  if (styleList.fontFamily) {
    delete styleList.fontFamily;
  }
  if (!zawgyi) {
    styleList["fontFamily"] = font;
  }
  return (
    <Text style={{ ...styleList }}>
      {font_converter(children ? children : "", zawgyi)}
    </Text>
  );
}
