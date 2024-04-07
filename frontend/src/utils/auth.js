import { AUTH_TOKEN_STORAGE_KEY } from '../constants/constants';
import { getFromStorage } from './storage';

export function isLoggedIn() {
  return getFromStorage(AUTH_TOKEN_STORAGE_KEY) !== null;
}
