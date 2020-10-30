import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ActivityScreen from "../screens/ActivityScreen";
import { Image, View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = "Home";

const LogoTitle = () => {
  return (
    <View style={{ paddingLeft: 20 }}>
      <Text style={{ fontSize: 18, color: "#1D9129", fontWeight: "bold" }}>
        Golden Paddy
      </Text>
    </View>
  );
};
const tabColor = {
  activeTintColor: "#2fb53d",
  inactiveTintColor: "#828282",
};
export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({
    headerLeft: (props) => <LogoTitle {...props} />,
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
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="explore" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          title: "Activity",
          tabBarOptions: tabColor,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="bell" type="community" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "How to get started";
    case "Ac":
      return "Links to learn more";
  }
}
