import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import AuthContext from "../utils/context/AuthContext";
import analytics from "@react-native-firebase/analytics";
import { getWeather } from "../api/explore";
import { status } from "../utils/weatherStatus";
import CustomText from "../components/CustomText";
import TownshipDropdown from "../components/TownshipDropdown";
import { mm_number } from "../utils/burmese";
import moment from "moment";

const deviceWidth = Dimensions.get("window").width;

export default function WeatherScreen({ navigation }) {
  const { auth, setAuth } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    getWeather().then((weather) => {
      if (weather) {
        setData(weather);
      }
    });
  }, []);

  if (!data) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  let township = data.township_list.map((item) => {
    return { label: item.translation, value: item.id };
  });
  console.log("====>", township);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* current weather top */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 30,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Image
              source={status(data.current.icon).image}
              style={{
                width: (deviceWidth - 180) / 2,
                height: (deviceWidth - 180) / 2,
              }}
            />
          </View>
          <View>
            <CustomText style={{ fontSize: 12, marginTop: 15 }}>
              {status(data.current.icon).name}
            </CustomText>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 36 }}>
              {Math.round((parseInt(data.current.temp) - 32) * (5 / 9))}
              °C
            </Text>
          </View>
          <View style={{ marginTop: 1 }}>
            <TownshipDropdown
              items={township}
              placeholder="တိုင်း "
              value={data.township}
              onChange={(value) => {
                console.log("here");
              }}
            />
          </View>
        </View>
      </View>

      {/* three widget */}
      <View style={{ flex: 1, flexDirection: "row", marginTop: 30 }}>
        <View style={{ flex: 1, padding: 10 }}>
          <View
            style={{
              backgroundColor: "#F0F7F1",
              borderRadius: 2,
              //justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/wind.png")}
              style={{ width: 40, height: 40, margin: 15 }}
            />
            <CustomText style={{ fontSize: 10, color: "#828282" }}>
              လေတိုက်နှုန်း
            </CustomText>
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              {mm_number(Math.round(data.current.wind_speed))} မိုင်နှုန်း
            </CustomText>
          </View>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <View
            style={{
              backgroundColor: "#F0F7F1",
              borderRadius: 2,
              //justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/humidity.png")}
              style={{ width: 40, height: 40, margin: 15 }}
            />
            <CustomText style={{ fontSize: 10, color: "#828282" }}>
              စိုထိုင်းဆ
            </CustomText>
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              {mm_number(Math.round(data.current.humidity * 100))} ရာနှုန်း
            </CustomText>
          </View>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <View
            style={{
              backgroundColor: "#F0F7F1",
              borderRadius: 2,
              //justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/rain.png")}
              style={{ width: 40, height: 40, margin: 15 }}
            />
            <CustomText style={{ fontSize: 10, color: "#828282" }}>
              မိုးရွာရန်ရာနှုန်း
            </CustomText>
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              {mm_number(Math.round(data.current.precip_probability * 100))}{" "}
              ရာနှုန်း
            </CustomText>
          </View>
        </View>
      </View>

      {/* hourly weather */}
      <View style={{ marginTop: 24 }}>
        <CustomText style={{ color: "#4C4C4C", fontSize: 12 }}>
          နာရီအလိုက် ခန့်မှန်းချက်များ
        </CustomText>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.hourly.map((item, index) => {
            if (moment(item.weather_date_time) > moment()) {
              return (
                <View
                  style={{
                    marginTop: 10,
                    width: 70,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={status(item.icon).image}
                    style={{ width: 25, height: 25 }}
                  />
                  <CustomText
                    style={{ marginTop: 15, color: "#828282", fontSize: 10 }}
                  >
                    {moment(item.weather_date_time).format("hh")} နာရီ
                  </CustomText>
                  <Text style={{ color: "#4C4C4C" }}>
                    {Math.round((parseInt(item.temperature) - 32) * (5 / 9))}° C
                  </Text>
                </View>
              );
            }
          })}
        </ScrollView>
      </View>
      {/* daily weather */}
      <View>
        <CustomText style={{ color: "#4C4C4C", fontSize: 14 }}>
          နောက်ရက်အတွက် ခန့်မှန်းချက်များ
        </CustomText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  contentContainer: { padding: 20 },
});
