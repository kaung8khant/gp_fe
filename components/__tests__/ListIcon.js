import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default function ListIcon(props) {
  return <MaterialIcons size={25} color={Colors.primary} {...props} />;
}
