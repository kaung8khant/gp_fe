import React, { useState } from "react";
import CustomText from "./CustomText";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const FilterRadio = ({ type, style, onChange }) => {
  const [active, setActive] = useState(null);
  const crop = [
    {
      id: 1,
      name: "Maize",
      translation: "ပြောင်း",
      image: require("../assets/images/maize-bw.png"),
      imageActive: require("../assets/images/maize.png"),
    },
    {
      id: 2,
      name: "Paddy",
      translation: "စပါး",
      image: require("../assets/images/paddy-bw.png"),
      imageActive: require("../assets/images/paddy.png"),
    },
    {
      id: 4,
      name: "Mung bean",
      translation: "ပဲတီစိမ်း",
      image: require("../assets/images/mung-bw.png"),
      imageActive: require("../assets/images/mung.png"),
    },
    {
      id: 3,
      name: "Sugarcane",
      translation: "ကြံ",
      image: require("../assets/images/sugar-bw.png"),
      imageActive: require("../assets/images/sugar.png"),
    },
    {
      id: 5,
      name: "Other crops",
      translation: "အခြားသီးနှံ",
      image: require("../assets/images/other-bw.png"),
      imageActive: require("../assets/images/other.png"),
    },
  ];
  return (
    <View>
      <View
        style={{
          textAlign: "left",
          marginBottom: 10,
          paddingRight: 20,
          paddingLeft: 20,
          marginTop: 20,
        }}
      >
        <CustomText>စိုက်နည်းပျိုးနည်းနဲ့ သွင်းအားစုမျာ</CustomText>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingRight: 10,
          paddingLeft: 10,
        }}
      >
        {crop.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setActive(active === item.id ? null : item.id);
                onChange(active === item.id ? null : item.id);
              }}
            >
              <View
                style={{
                  width: (deviceWidth - 120) / 5,
                  height: (deviceWidth - 120) / 5,
                  backgroundColor: "#F0F7F1",
                  borderRadius: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: active === item.id ? 0.5 : 0,
                  borderColor: "#2FB53D",
                }}
              >
                <Image
                  source={active === item.id ? item.imageActive : item.image}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <CustomText
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: 2,
                  color: active === item.id ? "#2FB53D" : "black",
                }}
              >
                {item.translation}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default FilterRadio;
