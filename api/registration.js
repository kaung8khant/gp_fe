import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
      AsyncStorage.setItem("access_token", response.data.data.token);

      let header = {
        headers: {
          Authorization: `Bearer ${AsyncStorage.getItem("access_token")}`,
        },
      };
      await FCM_token(response.data.data.token);
      if (response.data.data.is_new_user) {
        AsyncStorage.setItem("new_user", "1");
        callback2();
      } else {
        let token = await AsyncStorage.getItem("access_token");
        callback();
      }
    }
  } catch (e) {
    onError("Server Error");
  }
};

const locationAPI = async (values, callback = () => {}) => {
  try {
    let token = await AsyncStorage.getItem("access_token");

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
    let token = await AsyncStorage.getItem("access_token");

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
export { login, locationAPI, mainCropAPI };
