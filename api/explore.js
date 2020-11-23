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

export { getProduct, getArticle, productDetail, articleDetail };
