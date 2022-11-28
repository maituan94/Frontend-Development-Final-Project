import axios from "axios";
import { API_URL, API_PATH, ENDPOINTS } from "../constants";

const URL = `${API_URL}/${API_PATH}/${ENDPOINTS.PURCHASE}`;

export const getPurchases = () => {
  return axios
    .get(`${URL}s`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};


export const createPurchase = (body) => {
  return axios
    .post(URL, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deletePurchase = (id) => {
  return axios
    .delete(`${URL}/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};