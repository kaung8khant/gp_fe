import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "../components/CustomText";

const Header = ({ navigation, location, title }) => {
  console.log(navigation);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        padding: 20,
        paddingTop: 10,
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          height: 30,
        }}
        onPress={() => navigation.goBack(location)}
      >
        <View style={{ flex: 1, height: 40 }}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
        </View>
        <View style={{ flex: 2, marginTop: 7 }}>
          <CustomText style={{ fontSize: 12 }}>နောက်သို့</CustomText>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 2, marginTop: 5 }}>
        <CustomText
          style={{
            textAlign: "left",
            fontSize: 14,
          }}
        >
          {title}
        </CustomText>
      </View>
    </View>
  );
};
export default Header;
