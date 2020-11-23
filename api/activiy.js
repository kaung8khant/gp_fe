import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getActivity = async () => {
  try {
    let token = await AsyncStorage.getItem("access_token");
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.get(`/explore/activity/`, header);

    if (!response.data) {
      return Promise.reject("error occur");
    }
    return response.data.data.alert_data;
  } catch (error) {
    console.log(error);
  }
};
const activityDetail = async (id) => {
  try {
    let token = await AsyncStorage.getItem("access_token");
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.get(`/activity/${id}/`, header);

    if (!response.data) {
      return Promise.reject("error occur");
    }
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { getActivity, activityDetail };
