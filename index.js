import { registerRootComponent } from "expo";
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "./config/RootNavigation.js";
import App from "./App";

//here
// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log("token", token);
//     AsyncStorage.setItem("fcm_token", token.token);
//   },
//   // (required) Called when a remote or local notification is opened or received
//   onNotification: function (notification) {
//     //RootNavigation.navigate("Activity");
//     console.log(notification);
//     const clicked = notification.userInteraction;
//     if (clicked) {
//       console.log(notification);
//       let route = notification.url;
//       switch (route) {
//         case "activity":
//           route = "Activity";
//           break;
//         case "explore":
//           route = "Explore";
//           break;
//         case "weather":
//           route = "Weather";
//           break;
//         default:
//           break;
//       }
//       RootNavigation.navigate(route);
//     } else {
//       let url = "";
//       let noti = null;
//       if (notification.data.notification) {
//         JSON.parse(notification.data.notification);
//         url = notification.data.url;
//       } else {
//         noti = notification;
//         url = "activity";
//       }
//       try {
//         PushNotification.localNotification({
//           //autoCancel: true,
//           // bigText:
//           //   "This is local notification demo in React Native app. Only shown, when expanded.",
//           //subText: "Local Notification Demo",
//           title: noti.title,
//           message: noti.body ? noti.body : noti.message,
//           url: url,
//           // vibrate: true,
//           // vibration: 300,
//           // playSound: true,
//           // soundName: "default",
//           //actions: '["Yes", "No"]',
//         });
//       } catch (e) {
//         console.log(e);
//       }
//     }
//     notification.finish();
//     // process the notification here
//   },
//   // Android only: GCM or FCM Sender ID
//   senderID: "256218572662",
//   requestPermissions: true,
//   largeIcon: "ic_launcher",
//   smallIcon: "ic_notification",
// });

//here

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("Message handled in the background!", remoteMessage);
// });

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
