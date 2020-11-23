import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ThemeProvider,
} from "react-native";
import Button from "../components/Button";
import Stepper from "../components/Stepper";
import * as Yup from "yup";
import { mainCropAPI } from "../api/registration";
import AuthContext from "../utils/context/AuthContext";
import CropSelection from "../components/CropSelection";
import analytics from "@react-native-firebase/analytics";
import CustomText from "../components/CustomText";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function MainCropScreen({ navigation }) {
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={{ flex: 1 }}>
        <Stepper
          style={{ marginRight: 20, marginLeft: 20, marginTop: 20 }}
          active={3}
        />
        <View style={{ marginTop: 10, padding: 20 }}>
          <CustomText
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: "#4C4C4C",
              fontStyle: "normal",
            }}
          >
            အဓိက စိုက်ပျိုးသီးနှံ
          </CustomText>
          <CustomText
            style={{
              marginTop: 16,
              fontSize: 14,
              textAlign: "center",
              color: "#828282",
            }}
          >
            စိုက်ပျိုးရေးနည်းပညာသစ်များ လေ့လာ၊ အကြံဉာဏ်ရယူနိုင်ပြီး
            သွင်းအားစုများ ရောင်းဝယ်နိုင်မယ့် တောင်သူတို့ရဲ့ ဒီဂျစ်တယ်စုရပ်
          </CustomText>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <CropSelection onChange={(value) => setCrop(value)} />

        <View
          style={{
            padding: 10,
            position: "absolute",
            bottom: 0,
            width: deviceWidth,
            justifyContent: "center",
          }}
        >
          <Button
            onPress={async () => {
              try {
                await analytics().logEvent("reg_crop", {
                  crop_id: crop,
                });
                await analytics().logEvent("reg_crop_continue", {
                  crop_id: crop,
                });
              } catch (e) {
                console.log(e);
              }
              mainCropAPI({ crop_id: crop }, () => setAuth(true));
            }}
            title="ဆက်လက်လုပ်ဆောင်မယ်"
            color="#841584"
            disabled={!crop}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    // paddingTop: 15,
  },
});
