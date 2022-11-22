import axios from "axios";
import { API_URL, API_PATH, ENDPOINTS } from "../../api/constants";

const URL = `${API_URL}/${API_PATH}/${ENDPOINTS.CUSTOMER}`;

export const getCustomers = () => {
  return axios
    .get(`${URL}s`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};


export const createCustomers = (body) => {
  return axios
    .post(URL, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};