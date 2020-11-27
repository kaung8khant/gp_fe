import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as RootNavigation from "../config/RootNavigation.js";
import analytics from "@react-native-firebase/analytics";
//  param {user_input}
const login = async (
  values,
  callback = () => {},
  callback2 = () => {},
  onError
) => {
  try {
    let response = await axios.post(`/account/register/`, values);

    if (!response.data.data.is_valid) {
      onError("Phone number is not valid");
    } else {
      AsyncStorage.setItem("access_token2", response.data.data.token);

      console.log("login", response.data.data);
      await FCM_token(response.data.data.token);

      await analytics().setUserId("" + response.data.data.user_id);

      if (response.data.data.is_new_user) {
        AsyncStorage.setItem("new_user", "1");

        callback2();
      } else {
        let res = await check_user();
        //  let token = await AsyncStorage.getItem("access_token");
        if (res) {
          RootNavigation.navigate(res);
        } else {
          AsyncStorage.setItem("access_token", response.data.data.token);
          callback();
        }
      }
    }
  } catch (e) {
    console.log(e);
    onError("Server Error");
  }
};

const locationAPI = async (values, callback = () => {}) => {
  try {
    let token = await AsyncStorage.getItem("access_token2");

    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    let response = await axios.post(`/location/user/update/`, values, header);

    if (!response.data) {
      return Promise.reject("error occur");
    }

    callback();

    //localStorage.setItem("user-id", response.data.id);
  } catch (e) {
    console.log(e);
  }
};
const mainCropAPI = async (values, callback = () => {}) => {
  try {
    let token = await AsyncStorage.getItem("access_token2");

    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    let response = await axios.post(`/crop/user/update/`, values, header);

    if (!response.data) {
      return Promise.reject("error occur");
    }

    AsyncStorage.setItem("access_token", token);
    // try {
    //   analytics.setUserProperties({
    //     main_crop: cropname,
    //   });
    // } catch (e) {
    //   console.log("log error");
    // }
    callback();

    //localStorage.setItem("user-id", response.data.id);
  } catch (e) {
    console.log(e);
  }
};

const FCM_token = async (token) => {
  try {
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let fcm_token = await AsyncStorage.getItem("fcm_token");
    if (token) {
      let response = await axios.post(
        `/account/device/registration/`,
        { registration_id: fcm_token },
        header
      );

      if (!response.data) {
        return Promise.reject("error occur");
      }
      console.log("FCM Token", response.data);
    }
  } catch (e) {
    console.log(e);
  }
};

const check_user = async () => {
  try {
    let token = await AsyncStorage.getItem("access_token2");

    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (token) {
      let response = await axios.get(`/account/user/check/`, header);
      if (!response.data) {
        return Promise.reject("error occur");
      }
      if (!response.data.data.is_location_selected) {
        return "Location";
      } else if (!response.data.data.is_tag_selected) {
        return "MainCrop";
      } else {
        return false;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export { login, locationAPI, mainCropAPI, check_user };
