import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ThemeProvider,
  Alert,
  Keyboard,
} from "react-native";
import Button from "../components/Button";
import { Input } from "react-native-elements";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import Stepper from "../components/Stepper";
import * as Yup from "yup";
import { login } from "../api/registration";
import AuthContext from "../utils/context/AuthContext";
import FontContext from "../utils/context/FontContext";
import analytics from "@react-native-firebase/analytics";
import CustomText from "../components/CustomText";

import { font_converter } from "../utils/string";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const { auth, setAuth } = useContext(AuthContext);
  const { zawgyi, setZawgyi } = useContext(FontContext);

  const converter = (string) => font_converter(string, zawgyi);

  const YupObj = Yup.object().shape({
    phone: Yup.string()
      .matches(/^(\+95|09)/, "Please provide valid phone number")
      .min(9, "Phone number need to be at least 9 numbers")
      .max(14, "Please provide valid phone number")
      .required("Required"),
  });

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text>{zawgyi ? "Zawgyi" : "Unicode"}</Text>
      <View style={{ flex: 1 }}>
        <Stepper style={{ margin: 20, marginTop: 40 }} active={1} />
        <View style={{ marginTop: 10, padding: 20 }}>
          <CustomText
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#4C4C4C",
              fontStyle: "normal",
              fontWeight: "bold",
            }}
          >
            ရွှေသီးနှံ မှ ကြိုဆိုပါတယ်
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
      <View style={{ flex: 1 }}>
        <View style={styles.bottomWrapper}>
          <CustomText style={styles.inputlabel}>
            ဖုန်းနံပါတ်နဲ့ အကောင့် ဖွင့်မယ်
          </CustomText>
          <Input
            placeholder={converter("ဖုန်းနံပါတ်ဖြည့်မယ်")}
            inputContainerStyle={{
              borderBottomWidth: 0,
              width: deviceWidth - 40,
            }}
            inputStyle={{
              fontFamily: zawgyi ? "Zawgyi" : "Pyidaungsu",
              fontSize: 16,
            }}
            keyboardType={"phone-pad"}
            onChangeText={(text) => {
              YupObj.validate({ phone: text })
                .then(function (value) {
                  setPhone(text);
                  setError(null);
                })
                .catch(function (err) {
                  setPhone(text);
                  setError(err.errors[0]);
                });
            }}
            errorStyle={{ color: "red" }}
            errorMessage={error ? error : ""}
            style={styles.input}
            value={phone}
          />
        </View>

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
              Keyboard.dismiss();
              try {
                console.log("here");
                await analytics().logEvent("reg_phone_no", {
                  phone_number: phone,
                });
                await analytics().logEvent("reg_phone_continue", {
                  phone_number: phone,
                });
              } catch (e) {
                console.log(e);
              }

              login(
                { user_input: phone },
                () => setAuth(true), //if not new user
                //() => navigation.navigate("Location"),
                () => navigation.navigate("Location"), //if new user
                setError
              );
            }}
            title={"ဆက်လက်လုပ်ဆောင်မယ်"}
            color="#841584"
            disabled={error || phone.length === 0 ? true : false}
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
  inputlabel: {
    paddingLeft: 10,
    fontSize: 14,
    color: "#828282",
    marginBottom: 6,
  },
  bottomWrapper: {
    bottom: 0,
    padding: 10,
  },
  input: {
    borderBottomWidth: 0,
    backgroundColor: "#F0F7F1",
    borderRadius: 4,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
