import React, { useEffect } from "react";
import PushNotification from "react-native-push-notification";
import * as RootNavigation from "./RootNavigation.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LocalNotification from "../components/LocalNotification";

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("token", token);
        AsyncStorage.setItem("fcm_token", token.token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        //RootNavigation.navigate("Activity");
        console.log(" NOTIFICATION ==>", notification);
        let noti = JSON.parse(notification.notification);
        PushNotification.localNotification({
          //autoCancel: true,
          bigText:
            "This is local notification demo in React Native app. Only shown, when expanded.",
          subText: "Local Notification Demo",
          title: "test here",
          message: "here",
          // vibrate: true,
          // vibration: 300,
          // playSound: true,
          // soundName: "default",
          //actions: '["Yes", "No"]',
        });
        //notification.finish();
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: "256218572662",
      requestPermissions: true,
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
    });
  }, []);
  return null;
};
export default RemotePushController;
