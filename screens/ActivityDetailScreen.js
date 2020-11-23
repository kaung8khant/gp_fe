import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { activityDetail } from "../api/activiy";
import moment from "moment";
import Button from "../components/Button";
import analytics from "@react-native-firebase/analytics";

const deviceWidth = Dimensions.get("window").width;

const actionList = {
  weather: { route: "WeatherDetail", name: "မိုးလေဝသ ခန့်မှန်းချက်" },
  explore: { route: "Home", name: "အသစ်တွေကြည့်မယ်" },
  activity: { route: "Root", name: "အသစ်တွေကြည့်မယ်" },
};

export default function ActivityDetailScreen({ route, navigation }) {
  const [activity, setActivity] = useState(null);
  const { itemId } = route.params;

  useEffect(() => {
    activityDetail(itemId).then((data) => {
      setActivity(data);
    });
  }, []);

  if (!activity) {
    return (
      <ScrollView style={styles.container}>
        <Text>Loading</Text>
      </ScrollView>
    );
  }
  let action = null;
  if (activity.action) {
    action = actionList[activity.action];
  }
  console.log("activiy", activity);

  let img = activity.detail ? activity.detail.image : activity.picture;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <Text
          style={{ fontWeight: "bold", fontSize: 16, fontFamily: "Pyidaungsu" }}
        >
          {activity.name}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 10,
            marginTop: 8,
            color: "#4C4C4C",
          }}
        >
          {moment(activity.updated_at).format("DD/MM/YYYY")}
        </Text>
      </View>
      {img && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: img }} />
        </View>
      )}

      <View style={{ marginTop: 24 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#828282",
            wordBreak: "break-word",
            whiteSpace: "pre-line",
            fontFamily: "Pyidaungsu",
          }}
        >
          {activity.description}
        </Text>
      </View>
      <View style={{ position: "relative", marginTop: 80 }}>
        {activity.product && (
          <Button
            onPress={() =>
              navigation.navigate("ProductDetail", {
                itemId: activity.product,
              })
            }
            title="စစ်ဆေးမယ်"
            color="#841584"
            accessibilityLabel="check product"
          />
        )}
        {action && (
          <Button
            onPress={() => {
              navigation.navigate(action.route);
            }}
            title={action.name}
            color="#841584"
            accessibilityLabel="check product"
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
  },
  contentContainer: {},
  image: {
    width: 200,
    height: 250,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: deviceWidth - 40,
    height: 250,
    backgroundColor: "#E9F3FD",
  },
});
