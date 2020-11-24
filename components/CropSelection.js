import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import CustomText from "../components/CustomText";

const deviceWidth = Dimensions.get("window").width;

const CropSelection = ({ onChange }) => {
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
  ];
  let crop2 = [
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
    <>
      <View style={styles.cropContainer}>
        {crop.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onChange(item.id);
              setActive(item.id);
            }}
          >
            <View style={active === item.id ? styles.cropActive : styles.crop}>
              <Image
                source={active === item.id ? item.imageActive : item.image}
                style={{
                  width: (deviceWidth - 200) / 3,
                  height: (deviceWidth - 200) / 3,
                }}
              />
            </View>
            <CustomText
              style={
                active === item.id ? styles.cropActiveLabel : styles.cropLabel
              }
            >
              {item.translation}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.cropContainer}>
        {crop2.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onChange(item.id);
              setActive(item.id);
            }}
          >
            <View style={active === item.id ? styles.cropActive : styles.crop}>
              <Image
                source={active === item.id ? item.imageActive : item.image}
                style={{
                  width: (deviceWidth - 200) / 3,
                  height: (deviceWidth - 200) / 3,
                }}
              />
            </View>
            <CustomText
              style={
                active === item.id ? styles.cropActiveLabel : styles.cropLabel
              }
            >
              {item.translation}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  cropContainer: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  cropLabel: {
    textAlign: "center",
    marginTop: 5,
    color: "black",
  },
  cropActiveLabel: {
    textAlign: "center",
    marginTop: 5,
    color: "#2FB53D",
  },
  crop: {
    marginLeft: 10,
    marginRight: 10,
    width: (deviceWidth - 100) / 3,
    height: (deviceWidth - 70) / 3,
    backgroundColor: "#F0F7F1",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  cropActive: {
    borderWidth: 1,
    borderColor: "#2FB53D",
    marginLeft: 10,
    marginRight: 10,
    width: (deviceWidth - 100) / 3,
    height: (deviceWidth - 70) / 3,
    backgroundColor: "#F0F7F1",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CropSelection;
