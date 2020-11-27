import * as React from "react";
import { useState, useContext, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import AuthContext from "../utils/context/AuthContext";
import { getProduct, getArticle, getCurrentWeather } from "../api/explore";
import { string_excerpt } from "../utils/string";
import analytics from "@react-native-firebase/analytics";
import CustomText from "../components/CustomText";
import { mm_number } from "../utils/burmese";
import FontContext from "../utils/context/FontContext";
import { font_converter } from "../utils/string";
import WeatherCard from "../components/WeatherCard";
import FilterRadio from "../components/FilterRadio";

import TabBarIcon from "../components/TabBarIcon";

const deviceWidth = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {
  const [product, setProduct] = useState([]);
  const [article, setArticle] = useState([]);
  const [cropId, setCropId] = useState(null);
  const [weather, setWeather] = useState(null);
  const { zawgyi, setZawgyi } = useContext(FontContext);

  const converter = (string) => font_converter(string, zawgyi);
  //setAuth(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getProduct(cropId).then((productdata) => {
      getArticle(cropId).then((data) => {
        setProduct(productdata ? productdata : []);
        setArticle(data ? data : []);
      });
    });
  }, [cropId]);

  useEffect(() => {
    if (!weather) {
      getCurrentWeather().then((weatherdata) => {
        setWeather(weatherdata);
      });
    }
  }, [weather]);
  if (!product && !article && !weather) {
    return (
      <ScrollView style={styles.container}>
        <Text>Loading</Text>
      </ScrollView>
    );
  }
  let feed = [];
  let length =
    product.length / 4 > article.length ? product.length : article.length;
  let isproduct = product.length / 4 > article.length ? true : false;
  let j = 0;
  let pkey = 0;
  let akey = 0;

  for (var i = 0; i < length; isproduct ? (i = i + 4) : i++) {
    if (isproduct) {
      pkey = i;
      akey = j;
    } else {
      pkey = j;
      akey = i;
    }
    let articleItem = [];
    if (article[akey]) {
      let article_id = article[akey].id;
      articleItem.push(
        <TouchableOpacity
          key={akey}
          style={styles.imageContainer}
          onPress={async () => {
            try {
              await analytics().logEvent("view_article", {
                action_done: "click",
                article_id: article_id,
              });
            } catch (e) {
              console.log("log error");
            }
            navigation.navigate("ArticleDetail", {
              itemId: article_id,
            });
          }}
        >
          <View style={styles.item}>
            {article[akey].image && (
              <Image
                style={styles.image}
                source={{ uri: article[akey].image }}
              />
            )}

            <CustomText style={styles.imageLabel}>New</CustomText>
          </View>
          <View style={{ marginTop: 8 }}>
            <CustomText
              style={{
                fontSize: 14,
                width: deviceWidth - 40,
                color: "#4C4C4C",
                fontWeight: "bold",
              }}
            >
              {article[akey].name}
            </CustomText>
          </View>
          <CustomText
            style={{
              marginTop: 4,
              fontSize: 12,
              color: "#828282",
            }}
          >
            {article[akey].short_description}
          </CustomText>
        </TouchableOpacity>
      );
    }
    let productItem = [];
    for (let k = 0; k < 4; k++) {
      if (product[pkey + k]) {
        let id = product[pkey + k].id;
        productItem.push(
          <TouchableOpacity
            key={k}
            style={{ marginTop: 8, marginBottom: 15 }}
            onPress={async () => {
              try {
                await analytics().logEvent("view_product", {
                  action_done: "click",
                  product_id: product[pkey + k].id,
                });
              } catch (e) {
                console.log("log error");
              }
              navigation.navigate("ProductDetail", {
                itemId: id,
              });
            }}
          >
            <View style={styles.product}>
              <Image
                style={styles.productImage}
                source={
                  product[pkey + k].image
                    ? {
                        uri: product[pkey + k].image,
                      }
                    : require("../assets/images/product.png")
                }
              />
              <Text style={styles.imageLabel}>New</Text>
            </View>
            <View style={{ marginTop: 8, maxWidth: (deviceWidth - 55) / 2 }}>
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#4C4C4C",
                }}
              >
                {string_excerpt(product[pkey + k].name)}
              </CustomText>
              <CustomText
                style={{
                  fontSize: 12,

                  color: "#828282",
                }}
              >
                {product[pkey + k].dosage}
              </CustomText>
              <Text
                style={{
                  color: "#1D9129",
                  fontFamily: zawgyi ? "" : "PyidaungsuBold",
                  fontWeight: zawgyi ? "bold" : "",
                  fontSize: 14,
                }}
              >
                {converter(mm_number(product[pkey + k].maximum_retail_price))}
                {converter(" ကျပ်")}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    }
    feed.push(
      <React.Fragment key={i}>
        {articleItem}
        <View style={styles.productContainer}>{productItem}</View>
      </React.Fragment>
    );

    j++;
    if (!isproduct) {
      j = j + 3;
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 5 }}>
        <WeatherCard data={weather} navigation={navigation} />
        <FilterRadio onChange={(id) => setCropId(id)} />
        <View style={{ padding: 15 }}>{feed}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  routeCard: {
    borderRadius: 10,
    paddingRight: 42,
    paddingLeft: 42,
    shadowColor: "#CBD2D5B9",
    elevation: 10,
    shadowRadius: 5,
  },
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  item: {},
  image: {
    width: deviceWidth - 40,
    height: (deviceWidth - 170) / 2,
    borderRadius: 2,
  },
  productImage: {
    width: (deviceWidth - 55) / 2,
    height: (deviceWidth - 100) / 2,
    borderRadius: 2,
  },
  imageLabel: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "#fff",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 1,
  },
  productContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  product: {
    width: (deviceWidth - 55) / 2,
    height: (deviceWidth - 100) / 2,
    backgroundColor: "#E9F3FD",
    borderRadius: 2,
  },
});
