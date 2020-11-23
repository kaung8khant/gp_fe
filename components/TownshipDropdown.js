import React, { useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import FontContext from "../utils/context/FontContext";
import { font_converter } from "../utils/string";

const TownshipDropdown = ({
  items,
  placeholder,
  value,
  onChange,
  disabled = false,
  dropDownMaxHeight,
}) => {
  const { zawgyi, setZawgyi } = useContext(FontContext);

  const converter = (string) => font_converter(string, zawgyi);

  let controller;
  let itemList = items.map((item) => {
    return { label: converter(item.label), value: item.value };
  });
  return (
    <DropDownPicker
      items={itemList}
      controller={(instance) => (controller = instance)}
      placeholder={converter(placeholder)}
      defaultValue={value}
      placeholderStyle={{
        color: "rgba(0,0,0,0.3)",
        fontSize: 16,
      }}
      selectedLabelStyle={{ color: "black" }}
      containerStyle={{
        height: 30,
        border: 0,
      }}
      dropDownMaxHeight={dropDownMaxHeight}
      disabled={disabled}
      style={{
        fontFamily: zawgyi ? "" : "Pyidaungsu",
        backgroundColor: "#F0F7F1",

        borderColor: "#F0F7F1",
        width: 110,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
      }}
      labelStyle={{
        fontFamily: zawgyi ? "" : "Pyidaungsu",
        color: "black",
        fontSize: 16,
      }}
      itemStyle={{
        color: "red",
        fontFamily: zawgyi ? "" : "Pyidaungsu",
        justifyContent: "flex-start",
      }}
      dropDownStyle={{
        backgroundColor: "#F0F7F1",
        borderColor: "#F0F7F1",
      }}
      onChangeItem={(item) => onChange(item.value)}
    />
  );
};

export default TownshipDropdown;
