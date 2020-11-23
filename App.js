import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import ArticleDetailScreen from "./screens/ArticleDetailScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import axios from "axios";
import AuthContext from "./utils/context/AuthContext";
import FontContext from "./utils/context/FontContext";
import LocationScreen from "./screens/LocationScreen";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./components/Header";
import MainCropScreen from "./screens/MainCropScreen";
import ActivityDetailScreen from "./screens/ActivityDetailScreen";
import SettingScreen from "./screens/SettingScreen";
import { navigationRef } from "./config/RootNavigation";
import CallScreen from "./screens/CallScreen";
import analytics from "@react-native-firebase/analytics";
import { isUnicode } from "react-native-mdetect";
import * as Rabbit from "rabbit-node";
// import {
//   request,
//   PERMISSIONS,
//   checkNotifications,
//   requestNotifications,
// } from "react-native-permissions";

axios.defaults.baseURL = "https://gp2backend-staging.goldenpaddy.com/api";

const Stack = createStackNavigator();

export default function App(props) {
  const [auth, setAuth] = useState(false);
  const [zawgyi, setZawgyi] = useState(false);
  const routeNameRef = React.useRef();
  const value = { auth, setAuth };
  const font = { zawgyi, setZawgyi };

  useEffect(() => {
    // async function log(name) {
    //   await analytics().logScreenView({
    //     screen_name: name,
    //     screen_class: name,
    //   });
    // }
    // request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
    //   console.log(result);
    // });

    // requestNotifications(["alert", "sound"]).then(({ status, settings }) => {
    //   // …
    //   console.log("here->", status);
    // });

    // checkNotifications().then(({ status, settings }) => {
    //   // …
    // });
    isUnicode().then((value) => {
      if (!value) {
        setZawgyi(true);
      }
    });

    if (!auth) {
      AsyncStorage.getItem("access_token").then((data) => {
        if (data) {
          setAuth(true);
        }
      });
      //log("Registration");
    } else {
      //log("Explore");
    }
    // messaging()
    //   .getToken()
    //   .then((token) => {
    //     console.log(token);
    //   });
  }, [auth]);

  const isLoadingComplete = useCachedResources();
  let [fontsLoaded] = useFonts(
    // zawgyi
    //   ?
    {
      Zawgyi: require("./assets/fonts/NotoSansZawgyi-Regular.ttf"),
      ZawgyiBold: require("./assets/fonts/NotoSansZawgyi-Bold.ttf"),
      //   }
      // : {
      Pyidaungsu: require("./assets/fonts/Pyidaungsu-Regular.ttf"),
      PyidaungsuBold: require("./assets/fonts/Pyidaungsu-Bold.ttf"),
    }
  );

  let isSignedIn = false;

  if (!isLoadingComplete) {
    return null;
  } else {
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="white" barStyle={"dark-content"} />
          {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
          <AuthContext.Provider value={value}>
            <FontContext.Provider value={font}>
              <NavigationContainer
                ref={navigationRef}
                linking={LinkingConfiguration}
                onReady={() =>
                  (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
                }
                onStateChange={async (state) => {
                  const previousRouteName = routeNameRef.current;
                  const currentRouteName = navigationRef.current.getCurrentRoute()
                    .name;

                  // if (previousRouteName !== currentRouteName) {
                  //   await analytics().logScreenView({
                  //     screen_name: currentRouteName,
                  //     screen_class: currentRouteName,
                  //   });
                  // }
                }}
              >
                <Stack.Navigator>
                  {auth ? (
                    <>
                      <Stack.Screen
                        name="Root"
                        component={BottomTabNavigator}
                      />
                      <Stack.Screen
                        name="ProductDetail"
                        component={ProductDetailScreen}
                      />
                      <Stack.Screen
                        name="ArticleDetail"
                        component={ArticleDetailScreen}
                      />
                      <Stack.Screen
                        name="ActivityDetail"
                        component={ActivityDetailScreen}
                      />
                      <Stack.Screen name="Setting" component={SettingScreen} />
                      <Stack.Screen name="Call" component={CallScreen} />
                    </>
                  ) : (
                    <>
                      <Stack.Screen
                        options={{ headerShown: false }}
                        name="Login"
                        component={LoginScreen}
                      />
                      <Stack.Screen
                        name="Location"
                        component={LocationScreen}
                        options={{
                          header: (props) => {
                            return (
                              <Header
                                navigation={props.navigation}
                                title={"တည်နေရာ"}
                              />
                            );
                          },
                          headerStyle: {
                            elevation: 0,
                          },
                        }}
                      />
                      <Stack.Screen
                        name="MainCrop"
                        component={MainCropScreen}
                        options={{
                          header: (props) => {
                            return (
                              <Header
                                navigation={props.navigation}
                                title={"အဓိက စိုက်ပျိုးသီးနှံ"}
                              />
                            );
                          },
                          headerStyle: {
                            elevation: 0,
                          },
                        }}
                      />
                    </>
                  )}
                </Stack.Navigator>
              </NavigationContainer>
            </FontContext.Provider>
          </AuthContext.Provider>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
