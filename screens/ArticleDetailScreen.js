import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { articleDetail } from "../api/explore";
import analytics from "@react-native-firebase/analytics";
import CustomText from "../components/CustomText";

const deviceWidth = Dimensions.get("window").width;

export default function ArticleDetailScreen({ route, navigation }) {
  const [article, setArticle] = useState(null);
  const { itemId } = route.params;
  console.log(itemId);
  useEffect(() => {
    articleDetail(itemId).then((data) => {
      setArticle(data);
    });
  }, []);

  if (!article) {
    return (
      <ScrollView style={styles.container}>
        <Text>Loading</Text>
      </ScrollView>
    );
  }
  console.log(article);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.productImage}
          source={
            article.image && article.image.length > 0
              ? { uri: article.image[0].image }
              : require("../assets/images/product.png")
          }
        />
      </View>
      <View style={{ padding: 20 }}>
        <View>
          <CustomText
            style={{
              marginRight: 20,
              fontSize: 16,
              color: "#4C4C4C",
              fontWeight: "bold",
            }}
          >
            {article.name}
          </CustomText>
        </View>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          {article.tag.map((item, index) => (
            <CustomText
              key={index}
              style={{ marginRight: 20, fontSize: 14, color: "black" }}
            >
              {item.translation}
            </CustomText>
          ))}
        </View>
        <View style={{ marginTop: 20 }}>
          <CustomText
            style={{ color: "#828282", fontSize: 14, fontFamily: "Pyidaungsu" }}
          >
            {article.translation.description_translation}
          </CustomText>
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
    width: deviceWidth,
    height: 250,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: deviceWidth,
    height: 250,
    backgroundColor: "#E9F3FD",
  },
});
