import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getProduct = async (id = null) => {
  try {
    let token = await AsyncStorage.getItem("access_token");

    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let productRoute = "/explore/product/";
    if (id) {
      productRoute = productRoute + "?tag_id=" + id;
    }

    let response = await axios.get(productRoute, header);

    return response.data.data.product_data;
  } catch (e) {
    console.log(e);
  }
};
const getArticle = async (id = null) => {
  try {
    let token = await AsyncStorage.getItem("access_token");
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let articleRoute = "/explore/article/";
    if (id) {
      articleRoute = articleRoute + "?tag_id=" + id;
    }
    let response = await axios.get(articleRoute, header);
    return response.data.data.article_data;
  } catch (e) {
    console.log(e);
  }
};

const productDetail = async (id) => {
  try {
    let token = await AsyncStorage.getItem("access_token");
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let response = await axios.get(`/product/${id}/`, header);

    if (!response.data) {
      return Promise.reject("error occur");
    }
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};

const articleDetail = async (id) => {
  try {
    let token = await AsyncStorage.getItem("access_token");
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let response = await axios.get(`/article/${id}/`, header);

    if (!response.data) {
      return Promise.reject("error occur");
    }
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};

const getCurrentWeather = async () => {
  try {
    let token = await AsyncStorage.getItem("access_token");
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.get("/weather/data/", header);

    if (!response.data) {
      return Promise.reject("error occur");
    }
    let data_list = response.data.data.currently;
    data_list["township"] = response.data.data.default_township_translation;

    return data_list;
  } catch (error) {
    console.log(error);
  }
};
const getWeather = async () => {
  try {
    let token = await AsyncStorage.getItem("access_token");
    let header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.get(`/weather/data/`, header);

    if (!response.data) {
      return Promise.reject("error occur");
    }

    let data_list = { current: response.data.data.currently };
    data_list["hourly"] = response.data.data.hourly.slice(0, 20);
    data_list["daily"] = response.data.data.daily.slice(0, 10);
    data_list["township"] = response.data.data.default_township_id;
    data_list["township_list"] = await getTownship(header);
    return data_list;
  } catch (error) {
    console.log(error);
  }
};
const getTownship = async (header) => {
  try {
    let response = await axios.get(`/location/township/list/`, header);

    if (!response.data) {
      return Promise.reject("error occur");
    }
    return response.data.data.main_list;
  } catch (error) {
    console.log(error);
  }
};
export {
  getProduct,
  getArticle,
  productDetail,
  articleDetail,
  getCurrentWeather,
  getWeather,
};
