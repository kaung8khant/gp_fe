import React, { useContext } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FontContext from "../utils/context/FontContext";
import { font_converter } from "../utils/string";

const CustomAccordion = ({
  items,
  placeholder,
  value,
  onChange,
  disabled = false,
  dropDownMaxHeight,
}) => {
  const { zawgyi, setZawgyi } = useContext(FontContext);

  const converter = (string) => font_converter(string, zawgyi);

  
  return (
    <View>
      <Text>here</Text>
    </View>
  );
  
};

 function _renderRow() {
    var header = (
      <View>
        <Text>Click to Expand</Text>
      </View>
    );

    var content = (
      <View style={...}>
        <Text>This content is hidden in the accordion</Text>
      </View>
    );

    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
      />
    );
}

export default CustomAccordion;
