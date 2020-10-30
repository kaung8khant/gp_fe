import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default function TabBarIcon(props) {
  if (props.type === "community") {
    return (
      <MaterialCommunityIcons
        name={props.name}
        size={25}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  } else {
    return (
      <MaterialIcons
        name={props.name}
        size={25}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
