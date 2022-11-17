import axios from "axios";
import { API_URL, API_PATH, ENDPOINTS } from "../../api/constants";

const URL = `${API_URL}/${API_PATH}/${ENDPOINTS.PRODUCTS}`;

export const getProducts = () => {
  return axios
    .get(URL)
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};