import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { productDetail } from "../api/explore";
import Button from "../components/Button";
import analytics from "@react-native-firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomText from "../components/CustomText";

const deviceWidth = Dimensions.get("window").width;

export default function ProductDetailScreen({ route, navigation }) {
  const [product, setProduct] = useState(null);
  const [disable, setDisable] = useState(false);
  const { itemId } = route.params;

  useEffect(() => {
    productDetail(itemId).then((data) => {
      setProduct(data);
    });
  }, []);

  const handleCallMeBack = async () => {
    let token = await AsyncStorage.getItem("access_token");
    let fcm = await AsyncStorage.getItem("fcm_token");
    console.log(fcm);
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`/notification/call/back/`, { product_id: itemId }, header)
      .then(function (response) {
        console.log(response.data);
        if (!response.data) {
          return Promise.reject("error occur");
        }
        if (response.data.data.is_sent) {
          showToastWithGravity();
          setDisable(true);
        }
        //localStorage.setItem("user-id", response.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "တောင်းဆိုမှုကို လက်ခံရရှိပါတယ် သိပ်မကြာခင် အကြောင်းပြန်ပါမယ်",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };

  if (!product) {
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
      <View style={styles.imageContainer}>
        <Image
          style={styles.productImage}
          source={
            product.image && product.image.length > 0
              ? { uri: product.image[0].image }
              : require("../assets/images/product.png")
          }
        />
      </View>
      <View style={{ padding: 20 }}>
        <View>
          <CustomText
            style={{
              fontSize: 16,
              fontFamily: "PyidaungsuBold",
              marginRight: 20,
              color: "#4C4C4C",
            }}
          >
            {product.name}
          </CustomText>
        </View>
        <View style={{ flexDirection: "row" }}>
          {product.tag.map((item, index) => (
            <CustomText
              key={index}
              style={{
                marginRight: 20,
                fontSize: 14,
                fontFamily: "Pyidaungsu",
              }}
            >
              {item.translation}
            </CustomText>
          ))}
        </View>
        <View>
          <CustomText
            style={{
              marginRight: 20,
              fontSize: 14,
              color: "#4C4C4C",
            }}
          >
            {product.brand}
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              marginRight: 20,
              fontSize: 14,
              color: "#4C4C4C",
            }}
          >
            {product.dosage}
          </CustomText>
        </View>
        <View>
          <CustomText
            style={{
              marginRight: 20,
              marginTop: 4,
              color: "#2FB53D",
            }}
          >
            {product.maximum_retail_price ? product.maximum_retail_price : ""}{" "}
            ကျပ်
          </CustomText>
        </View>

        <View style={{ marginTop: 20 }}>
          <CustomText
            style={{
              whiteSpace: "pre-line",
              color: "#828282",
              fontFamily: "Pyidaungsu",
            }}
          >
            {product.description}
          </CustomText>
        </View>
        <View style={{ textAlign: "left" }}>
          <View style={{ marginTop: 20 }}>
            <CustomText style={{ fontSize: 14 }}>ဆိုင်နေရာ</CustomText>
          </View>
          <View>
            <CustomText
              style={{
                fontSize: 14,
                color: "#828282",
              }}
            >
              {product.address}
            </CustomText>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 35 }}>
          <View style={{ flex: 1 }}>
            <Button
              onPress={async () => {
                try {
                  await analytics().logEvent("call_buy_now_btn", {
                    action_done: "click",
                  });
                } catch (e) {
                  console.log("log error");
                }
                navigation.navigate("Call");
              }}
              title="ဖုန်းခေါ်မယ်"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress={async () => {
                try {
                  await analytics().logEvent("call_back_back_btn", {
                    action_done: "click",
                  });
                } catch (e) {
                  console.log("error logging");
                }
                handleCallMeBack();
              }}
              title="ဖုန်းပြန်ခေါ်ပါ"
              color="#841584"
              type={"inverted"}
              disabled={disable}
              style={{ flex: 1 }}
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
    backgroundColor: "#fafafa",
  },
  contentContainer: {},
  productImage: {
    width: 200,
    height: 250,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: deviceWidth,
    height: 260,
    backgroundColor: "#E9F3FD",
  },
});
