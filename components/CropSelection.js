import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
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
      image: "",
      imageActive: "",
    },
    {
      id: 2,
      name: "Paddy",
      translation: "စပါး",
      image: "",
      imageActive: "",
    },
    {
      id: 4,
      name: "Mung bean",
      translation: "ပဲတီစိမ်း",
      image: "",
      imageActive: "",
    },
  ];
  let crop2 = [
    {
      id: 3,
      name: "Sugarcane",
      translation: "ကြံ",
      image: "",
      imageActive: "",
    },
    {
      id: 5,
      name: "Other crops",
      translation: "အခြားသီးနှံ",
      image: "",
      imageActive: "",
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
            <View
              style={active === item.id ? styles.cropActive : styles.crop}
            />
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
            <View
              style={active === item.id ? styles.cropActive : styles.crop}
            />
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
  crop: {
    marginLeft: 10,
    marginRight: 10,
    width: (deviceWidth - 100) / 3,
    height: (deviceWidth - 70) / 3,
    backgroundColor: "#F0F7F1",
    borderRadius: 4,
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
  cropActive: {
    borderWidth: 1,
    borderColor: "#2FB53D",
    marginLeft: 10,
    marginRight: 10,
    width: (deviceWidth - 100) / 3,
    height: (deviceWidth - 70) / 3,
    backgroundColor: "#F0F7F1",
    borderRadius: 4,
  },
});

export default CropSelection;
