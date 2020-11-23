import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { getActivity } from "../api/activiy";
import { string_excerpt } from "../utils/string";
import analytics from "@react-native-firebase/analytics";

const deviceWidth = Dimensions.get("window").width;

export default function ActivityScreen({ navigation }) {
  const [noti, setNoti] = useState(null);

  useEffect(() => {
    if (!noti) {
      getActivity().then((data) => {
        setNoti(data);
      });
    }
  }, [noti]);

  if (!noti) {
    return (
      <ScrollView style={styles.container}>
        <Text>Loading</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {noti.length > 0 &&
        noti.map((item, index) => {
          let image = item.picture ? item.picture : item.type_picture;

          return (
            <TouchableOpacity
              key={index}
              style={{
                flex: 1,
                //marginTop: 40,
                flexDirection: "row",
                maxWidth: deviceWidth - 20,
              }}
              onPress={async () => {
                try {
                  await analytics().logEvent("view_noti", {
                    action_done: "click",
                    activity_id: "test",
                  });
                } catch (error) {
                  console.log("log error");
                }

                navigation.navigate("ActivityDetail", {
                  itemId: item.id,
                });
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#E9F3FD",
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <Image
                  source={
                    image
                      ? { uri: image }
                      : require("../assets/images/product.png")
                  }
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                  }}
                />
              </View>
              <View style={{ minHeight: 80 }}>
                <View
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    width: deviceWidth - 120,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Pyidaungsu",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    fontSize: 12,
                    wordBreak: "break-word",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Pyidaungsu",
                    }}
                  >
                    {string_excerpt(item.description, 35)}
                  </Text>
                </View>
                <View style={{ fontSize: 10 }}>
                  <Text>{item.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
});
