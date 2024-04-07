import axios from 'axios';
import { deleteFromStorage, getFromStorage } from './storage';
import {
  AUTH_TOKEN_STORAGE_KEY,
  LOGGED_IN_USER_DATA_STORAGE_KEY,
} from '../constants/constants';

export async function makeRequest(apiUrl) {
  const token = getFromStorage(AUTH_TOKEN_STORAGE_KEY);

  if (token) {
    apiUrl.headers = {
      ...apiUrl.headers,
      Authorization: token,
    };
  }

  const response = await axios(apiUrl);
  if (response.status === 401) {
    deleteFromStorage(AUTH_TOKEN_STORAGE_KEY);
    deleteFromStorage(LOGGED_IN_USER_DATA_STORAGE_KEY);
  }
  return response.data;
}
