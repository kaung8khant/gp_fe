import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { useContext } from "react";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ActivityScreen from "../screens/ActivityScreen";
import LearnScreen from "../screens/LearnScreen";
import { Image, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import FontContext from "../utils/context/FontContext";
import { font_converter } from "../utils/string";

const deviceWidth = Dimensions.get("window").width;
const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = "Home";

const LogoTitle = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingLeft: 20,
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <View>
        <CustomText
          style={{ fontSize: 18, color: "#1D9129", fontWeight: "bold" }}
        >
          ရွှေသီးနှံ
        </CustomText>
      </View>
    </View>
  );
};

export default function BottomTabNavigator({ navigation, route }) {
  const { zawgyi, setZawgyi } = useContext(FontContext);

  const converter = (string) => font_converter(string, zawgyi);
  const tabColor = {
    activeTintColor: "#2fb53d",
    inactiveTintColor: "#828282",
    style: {
      paddingBottom: 20,
      height: 70,
    },
    labelStyle: {
      fontSize: 12,
      fontFamily: zawgyi ? "Zawgyi" : "Pyidaungsu",
    },
  };
  navigation.setOptions({
    headerLeft: (props) => <LogoTitle {...props} navigation={navigation} />,
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginTop: 2, paddingRight: 20 }}
          onPress={() => navigation.navigate("Call")}
        >
          <View
            style={{ backgroundColor: "#E7F5E7", borderRadius: 70, padding: 2 }}
          >
            <MaterialIcons
              name="local-phone"
              size={19}
              color="#2fb53d"
              style={{
                backgroundColor: "#E7F5E7",
                borderRadius: 70,
                paddingRight: 2,
                paddingLeft: 2,
                paddingTop: 2,
                paddingBottom: 2,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 2, paddingRight: 20 }}
          onPress={() => navigation.navigate("Setting")}
        >
          <Ionicons
            name="ios-settings"
            size={24}
            color="#2fb53d"
            style={{
              backgroundColor: "#E7F5E7",
              borderRadius: 70,
              paddingRight: 5,
              paddingLeft: 5,
              paddingTop: 2,
              paddingBottom: 2,
            }}
          />
        </TouchableOpacity>
      </View>
    ),
    title: () => null,
  });

  return (
    <BottomTab.Navigator
      nitialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={tabColor}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: converter("ပင်မစာမျက်နှာ"),

          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="explore" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          title: converter("အသိပေးချက်"),
          tabBarOptions: tabColor,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="bell" type="community" />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          title: "Learn",
          tabBarOptions: tabColor,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="book" />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
}
