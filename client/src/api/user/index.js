import axios from 'axios';

import { API_URL, API_PATH, ENDPOINTS } from '../constants'

const URL = `${API_URL}/${API_PATH}/${ENDPOINTS.USER}`

export const createUser = (body) => {
  return axios.post(URL, body)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error);
    });
}

export const login = (credentials) => {
  return axios.post(`${URL}/login`, credentials)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log(error);
    });
}
