import axios from "axios";
import { getIdToken } from "firebase/auth";
import { auth } from "../config/firebase";
import { API_URL } from "../config/config";

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config: any) => {
  const user = auth.currentUser;
  if (user) {
    const token = await getIdToken(user);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
})