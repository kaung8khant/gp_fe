import React, { useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import FontContext from "../utils/context/FontContext";
import { font_converter } from "../utils/string";

const Dropdown = ({
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
        height: 50,
        border: 0,
      }}
      dropDownMaxHeight={dropDownMaxHeight}
      disabled={disabled}
      style={{
        fontFamily: zawgyi ? "Zawgyi" : "Pyidaungsu",
        backgroundColor: "#F0F7F1",
        broder: 0,
        borderColor: "#F0F7F1",
      }}
      labelStyle={{
        fontFamily: zawgyi ? "Zawgyi" : "Pyidaungsu",
        color: "black",
        fontSize: 16,
      }}
      itemStyle={{
        color: "red",
        fontFamily: zawgyi ? "Zawgyi" : "Pyidaungsu",
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

export default Dropdown;
