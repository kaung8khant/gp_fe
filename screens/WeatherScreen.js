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
import FontContext from "../utils/context/FontContext";
import { font_converter } from "../utils/string";

const deviceWidth = Dimensions.get("window").width;

export default function WeatherScreen({ navigation }) {
  const { auth, setAuth } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const { zawgyi, setZawgyi } = useContext(FontContext);

  const converter = (string) => font_converter(string, zawgyi);

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
    return { label: converter(item.translation), value: item.id };
  });
  console.log("====>", township);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
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
              တိမ်ထူထပ်
            </CustomText>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 36 }}>22' C</Text>
          </View>
          <View style={{ position: "absolute", bottom: 0 }}>
            <TownshipDropdown
              items={{ label: "here", value: 1 }}
              placeholder="တိုင်း "
              value={1}
              onChange={(value) => {
                console.log("here");
              }}
            />
          </View>
        </View>
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
