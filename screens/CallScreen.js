import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { activityDetail } from "../api/activiy";
import moment from "moment";
import Button from "../components/Button";
import analytics from "@react-native-firebase/analytics";
import call from "react-native-phone-call";

const args = {
  number: "+959976792894", // String value with the number to call
  prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
};

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function CallScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ paddingRight: 70, paddingLeft: 70, paddingBottom: 100 }}>
        <Text
          style={{
            fontSize: 18,
            color: "#828282",
            textAlign: "center",
            lineHeight: 30,
            fontFamily: "PyidaungsuBold",
          }}
        >
          ရွှေသီးနှံအဖွဲ့ သို့ တိုက်ရိုက် ဖုန်းခေါ်ဆိုမည်။
        </Text>
      </View>
      <View
        style={{ position: "absolute", width: deviceWidth - 40, bottom: 20 }}
      >
        <Button
          onPress={() => call(args).catch((e) => console.log(e))}
          title="စတင်ခေါ်ဆိုမယ်"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {},
});
