import PushNotification from "react-native-push-notification";
const LocalNotification = ({ notification }) => {
  console.log("here");
  PushNotification.localNotification({
    autoCancel: true,
    // bigText:
    //   "This is local notification demo in React Native app. Only shown, when expanded.",
    //subText: "Local Notification Demo",
    title: notification.title,
    message: notification.body,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: "default",
    //actions: '["Yes", "No"]',
  });
};

export default LocalNotification;
