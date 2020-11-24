import { Ionicons } from "@expo/vector-icons";
import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ThemeProvider,
  Keyboard,
} from "react-native";
import Button from "../components/Button";
import { Input } from "react-native-elements";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import Stepper from "../components/Stepper";
import { locationAPI } from "../api/registration";
import AuthContext from "../utils/context/AuthContext";
import Dropdown from "../components/Dropdown";
import location from "../config/location";
import _ from "lodash";
import analytics from "@react-native-firebase/analytics";
import CustomText from "../components/CustomText";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function LocationScreen({ navigation }) {
  const [state, setState] = useState(null);
  const [township, setTownship] = useState(null);
  const [village, setVillage] = useState(null);

  const [error, setError] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);

  let statelist = location.map((item) => {
    return { value: parseInt(item.id), label: item.translation };
  });

  let townshiplist,
    villagelist = [];
  if (state) {
    townshiplist = location[_.findIndex(location, { id: state })].township;
    if (township) {
      villagelist =
        townshiplist[_.findIndex(townshiplist, { id: township })].village;
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={{ flex: 1 }}>
        <Stepper
          style={{ marginRight: 20, marginLeft: 20, marginTop: 20 }}
          active={2}
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
            လက်ရှိနေထိုင်ရာဒေသကို ဖြည့်မယ်
          </CustomText>
          <CustomText
            style={{
              marginTop: 16,
              fontSize: 14,

              textAlign: "center",
              color: "#828282",
            }}
          >
            သင့်ရဲ့ သီးနှံအတွက် လိုအပ်တဲ့ အချက်အလက်များ ပေးပို့နိုင်ဖို့ သင့်ရဲ့
            တည်နေရာကို ဖြည့်ပါ။
          </CustomText>
        </View>
      </View>
      <View
        style={{ flex: 2, position: "absolute", bottom: 0, width: deviceWidth }}
      >
        <View style={{ padding: 20 }}>
          <View>
            <CustomText style={styles.inputlabel}>တိုင်း / ပြည်နယ်</CustomText>
            <Dropdown
              items={statelist}
              placeholder="တိုင်း / ပြည်နယ်ကို ရွေးချယ်မယ်"
              value={state}
              onChange={(value) => {
                setState(value);
                setTownship(null);
                setVillage(null);
              }}
            />
          </View>
          <View style={{ marginTop: 24 }}>
            <CustomText style={styles.inputlabel}>မြို့နယ်</CustomText>
            <Dropdown
              items={
                state
                  ? townshiplist.map((item) => {
                      return { label: item.translation, value: item.id };
                    })
                  : []
              }
              disabled={!state}
              placeholder="တိုင်း / ပြည်နယ်ကို ရွေးချယ်မယ်"
              value={township}
              onChange={(value) => {
                setTownship(value);
                setVillage(null);
              }}
            />
          </View>
          <View style={{ marginTop: 24 }}>
            <CustomText style={styles.inputlabel}>ရပ်ကွက် / ကျေးရွာ</CustomText>
            <Dropdown
              items={
                township
                  ? villagelist.map((item) => {
                      return { label: item.translation, value: item.id };
                    })
                  : []
              }
              disabled={!township}
              placeholder="တိုင်း / ပြည်နယ်ကို ရွေးချယ်မယ်"
              value={village}
              dropDownMaxHeight={100}
              onChange={(value) => setVillage(value)}
            />
          </View>

          <View style={{ marginTop: 24 }}>
            <Button
              onPress={async () => {
                try {
                  await analytics().logEvent("reg_location_continue", {
                    state_id: state,
                    township_id: township,
                    village_id: village,
                  });
                  await analytics().setUserProperties({
                    user_location: state + "," + township + "," + village,
                  });
                } catch (e) {
                  console.log(e);
                }
                locationAPI(
                  {
                    state_id: state,
                    township_id: township,
                    village_id: village,
                  },
                  () => navigation.navigate("MainCrop")
                );
              }}
              title="ဆက်လက်လုပ်ဆောင်မယ်"
              color="#841584"
              disabled={!state && !township && !village}
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    // paddingTop: 15,
    flex: 1,
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
  inputlabel: {
    fontSize: 14,
    color: "#828282",
    marginBottom: 6,
  },
});
