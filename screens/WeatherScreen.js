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
import { mm_number, mmday } from "../utils/burmese";
import moment from "moment";
import { List } from "react-native-paper";
import axios from "axios";

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
  const handleChange = async (value) => {
    let token = await AsyncStorage.getItem("access_token");
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`/weather/data/?township_id=${value}`, header)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }

        let data_list = { ...data };
        data_list["current"] = response.data.data.currently;
        data_list["hourly"] = response.data.data.hourly.slice(0, 20);
        data_list["daily"] = response.data.data.daily.slice(0, 10);
        data_list["township"] = value;
        console.log("here", data_list);
        setData(data_list);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
              {Math.round((parseInt(data.current.temp) - 32) * (5 / 9))}° C
            </Text>
          </View>
          <View style={{ marginTop: 1 }}>
            <TownshipDropdown
              items={township}
              placeholder="တိုင်း "
              value={data.township}
              onChange={handleChange}
            />
          </View>
        </View>
      </View>

      {/* three widget */}
      <View
        style={{ flex: 1, flexDirection: "row", marginTop: 30, padding: 20 }}
      >
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
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              {mm_number(Math.round(data.current.wind_speed))}{" "}
            </Text>
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              မိုင်နှုန်း
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
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              {mm_number(Math.round(data.current.humidity * 100))}{" "}
            </Text>
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              ရာနှုန်း
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
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              {mm_number(Math.round(data.current.precip_probability * 100))}{" "}
            </Text>
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              ရာနှုန်း
            </CustomText>
          </View>
        </View>
      </View>

      {/* hourly weather */}
      <View style={{ marginTop: 24, padding: 20 }}>
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
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{ marginTop: 15, color: "#828282", fontSize: 10 }}
                    >
                      {moment(item.weather_date_time).format("hh")}{" "}
                    </Text>
                    <CustomText
                      style={{ marginTop: 15, color: "#828282", fontSize: 10 }}
                    >
                      နာရီ
                    </CustomText>
                  </View>
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
        <CustomText
          style={{
            color: "#4C4C4C",
            fontSize: 14,
            margin: 20,
          }}
        >
          နောက်ရက်အတွက် ခန့်မှန်းချက်များ
        </CustomText>

        <List.AccordionGroup style={{ paddingRight: 0 }}>
          {data.daily
            .slice(0)
            .reverse()
            .map((item, index) => {
              return (
                <List.Accordion
                  expanded={false}
                  id={"" + index}
                  key={index}
                  title={
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          width: 100,
                        }}
                      >
                        <CustomText style={{ color: "#828282", fontSize: 14 }}>
                          {mmday(moment(item.weather_date).day())}
                        </CustomText>
                      </View>
                      <Image
                        source={status(item.icon).image}
                        style={{
                          width: 25,
                          height: 25,
                          marginLeft: 20,
                          //marginLeft: (deviceWidth - 170) / 3,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: (deviceWidth - 250) / 3,
                        }}
                      >
                        <Text>
                          {Math.round(
                            (parseInt(item.apparent_temperature) - 32) * (5 / 9)
                          )}
                          ° C
                        </Text>
                        <Text style={{ marginLeft: 20 }}>
                          {Math.round(
                            (parseInt(item.apparent_temperature_min) - 32) *
                              (5 / 9)
                          )}
                          ° C
                        </Text>
                      </View>
                    </View>
                  }
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      backgroundColor: "#F0F7F1",
                    }}
                  >
                    <View style={{ flex: 1, padding: 10 }}>
                      <View
                        style={{
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
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginTop: 5,
                            marginBottom: 10,
                          }}
                        >
                          {mm_number(item.wind_speed)}{" "}
                        </Text>
                        <CustomText
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginTop: 5,
                            marginBottom: 10,
                          }}
                        >
                          မိုင်နှုန်း
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
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginTop: 5,
                            marginBottom: 10,
                          }}
                        >
                          {mm_number(Math.round(item.humidity * 100))}{" "}
                        </Text>
                        <CustomText
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginTop: 5,
                            marginBottom: 10,
                          }}
                        >
                          ရာနှုန်း
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
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginTop: 5,
                            marginBottom: 10,
                          }}
                        >
                          {mm_number(Math.round(item.precip_probability * 100))}{" "}
                        </Text>
                        <CustomText
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginTop: 5,
                            marginBottom: 10,
                          }}
                        >
                          ရာနှုန်း
                        </CustomText>
                      </View>
                    </View>
                  </View>
                </List.Accordion>
              );
            })}
        </List.AccordionGroup>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
