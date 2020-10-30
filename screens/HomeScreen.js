import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  TouchableHighlight,
  Text,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "react-native-elements";
import ListIcon from "../components/ListIcon";
import TextWrap from "../components/TextWrap";

const deviceWidth = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {
  const [lang, setLang] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  let product = [];
  for (let index = 0; index < 4; index++) {
    product.push(
      <TouchableOpacity
        key={index}
        style={{ marginTop: 8 }}
        onPress={() => navigation.navigate("ProductDetail")}
      >
        <View style={styles.product}>
          <Image
            style={styles.productImage}
            source={require("../assets/images/product.png")}
          />
          <Text style={styles.imageLabel}>New</Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Product 1</Text>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>50 CC</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#1D9129" }}>
            13000 kyat
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate("ArticleDetail")}
        >
          <View style={styles.item}>
            <Image
              style={styles.image}
              source={require("../assets/images/farm.png")}
            />
            <Text style={styles.imageLabel}>New</Text>
          </View>
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 14, width: deviceWidth - 40 }}>
              Article Title
            </Text>
          </View>
          <Text style={{ fontSize: 12 }}>Article text</Text>
        </TouchableOpacity>
        <View style={styles.productContainer}>{product}</View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change"
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
    padding: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {},
  image: {
    width: deviceWidth - 40,
    height: (deviceWidth - 140) / 2,
    borderRadius: 2,
  },
  productImage: {
    width: (deviceWidth - 55) / 2,
    height: (deviceWidth - 55) / 2,
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
    height: (deviceWidth - 55) / 2,
    backgroundColor: "#E9F3FD",
    borderRadius: 2,
  },
});
