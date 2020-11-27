import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { Card } from "react-native-elements";
import CustomText from "../components/CustomText";
import { Entypo } from "@expo/vector-icons";
import { status } from "../utils/weatherStatus";
import { mm_number } from "../utils/burmese";

const deviceWidth = Dimensions.get("window").width;

const WeatherCard = ({ data, navigation }) => {
  if (!data) {
    return <View></View>;
  }
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Weather")}>
      <Card
        containerStyle={{ borderRadius: 4 }}
        onPress={() => console.log("here")}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              margin: "auto",
              alignItems: "center",
            }}
          >
            <Image
              source={status(data.icon).image}
              style={{
                width: (deviceWidth - 180) / 3,
                height: (deviceWidth - 180) / 3,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 5 }}>
              <CustomText
                style={{ textAlign: "center", color: "#828282", fontSize: 10 }}
              >
                {status(data.icon).name}
              </CustomText>
              <Text style={{ textAlign: "center", fontSize: 24, marginTop: 6 }}>
                {Math.round((parseInt(data.temp) - 32) * (5 / 9))}° C
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 5 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <CustomText
                style={{ textAlign: "center", fontSize: 10, marginTop: 2 }}
              >
                မိုးရွာရန်
              </CustomText>
              <Text>
                {" "}
                {mm_number(Math.round(data.precip_probability * 100))}{" "}
              </Text>
              <CustomText
                style={{ textAlign: "center", fontSize: 10, marginTop: 2 }}
              >
                ရာနှုန်း
              </CustomText>
              {/* {mm_number(Math.round(data.precip_probability * 100))} ရာနှုန်း */}
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: "#E7F5E7",
                  justifyContent: "center",
                  paddingTop: 3,
                  paddingBottom: 3,
                  marginTop: 12,
                  borderRadius: 14,
                  paddingRight: 15,
                  paddingLeft: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CustomText style={{ fontSize: 12, color: "#2FB53D" }}>
                  {data.township}
                </CustomText>
                <Entypo name="chevron-small-down" size={20} color="black" />
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
export default WeatherCard;
